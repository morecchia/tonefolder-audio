import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { TrackService } from 'src/app/core/services/track.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { PlaylistDialogService } from 'src/app/core/services/playlist-dialog.service';
import { Album } from 'src/app/shared/models/album';
import { Track } from 'src/app/shared/models/track';
import { SelectedFile } from 'src/app/shared/models/selected-file';

@Component({
  selector: 'app-track-container',
  templateUrl: './track-container.component.html',
  styleUrls: ['./track-container.component.scss']
})
export class TrackContainerComponent {
  tracksResponse: Observable<Album>;

  get selectedAlbum() { return this.trackService.selectedAlbum; }
  get playerState() { return this.playerService.audioState; }
  get currentTrack() { return this.playerService.currentFile?.track.name; }
  get loggedIn$() { return this.auth.isAuthenticated$; }

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private trackService: TrackService,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private playlistDialog: PlaylistDialogService) {
    this.route.params.subscribe(params => {
      this.tracksResponse = this.trackService.getTracks(params.id);
    });
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

  queueTrack(item: SelectedFile) {
    this.playlistService.addItem(item);

    if (this.playlistService.playlist.length === 1 && !this.playerService.selectedFile) {
      this.trackService.selectTrack(item);
      this.playlistDialog.openPlaylist();
    }
  }

  deleteTrack(track: Track) {
    this.trackService.deleteTrack(track)
      .subscribe();
  }
}
