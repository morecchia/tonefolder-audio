import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';
import { TrackService } from 'src/app/core/services/track.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { PlaylistDialogService } from 'src/app/core/services/playlist-dialog.service';
import { Album } from 'src/app/shared/models/album';
import { Track } from 'src/app/shared/models/track';
import { SelectedFile } from 'src/app/shared/models/selected-file';
import { PlaylistSelectComponent } from 'src/app/shared/components/playlist-select/playlist-select.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-track-container',
  templateUrl: './track-container.component.html',
  styleUrls: ['./track-container.component.scss']
})
export class TrackContainerComponent implements OnDestroy {
  tracksResponse: Observable<Album>;

  get selectedAlbum() { return this.trackService.selectedAlbum; }
  get playerState() { return this.playerService.audioState; }
  get currentTrack() { return this.playerService.currentFile?.track.name; }
  get loggedIn$() { return this.auth.isAuthenticated$; }

  private _destroy = new Subject();

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private modal: ModalService,
    private trackService: TrackService,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private playlistDialog: PlaylistDialogService) {
    this.route.params.subscribe(params => {
      this.tracksResponse = this.trackService.getTracks(params.id);
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  selectTrack(track: Track) {
    this.trackService.selectTrack({
      albumTitle: this.selectedAlbum.title,
      cover: this.selectedAlbum.cover,
      track: track,
    });
  }

  toggleTrack() {
    if (this.playerService.audioState.playing){
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }

  queueTrack(track: SelectedFile) {
    this.modal.open(PlaylistSelectComponent, {
      data: {
        selected: track
      },
      width: '600px',
    });

    this.modal.closed()
      .pipe(
        takeUntil(this._destroy),
        switchMap(id => this.playlistService.addItem(id, track))
      )
      .subscribe(res => {
        const playlist = this.playlistService.playlists.find(p => p.id === res.id);
        if (playlist != null && !this.playerService.selectedFile &&  this.playlistService.playlist.length === 1) {
          this.trackService.selectTrack(track);
          this.playlistDialog.openPlaylist();
        }
      })
  }

  deleteTrack(track: Track) {
    this.trackService.deleteTrack(track)
      .pipe(takeUntil(this._destroy))
      .subscribe();
  }
}
