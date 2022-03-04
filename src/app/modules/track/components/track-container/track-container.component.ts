import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectedFile, TrackService } from 'src/app/shared/services/track.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { PlaylistDialogService } from 'src/app/shared/services/playlist-dialog.service';
import { Album } from 'src/app/shared/models/album';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-track-container',
  templateUrl: './track-container.component.html',
  styleUrls: ['./track-container.component.scss']
})
export class TrackContainerComponent {
  tracksResponse: Observable<Album>;

  get selectedAlbum() { return this.trackService.selectedAlbum; }
  get playerState() { return this.playerService.state; }
  get currentTrack() { return this.playerService.currentFile?.title; }

  constructor(
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
      album: this.selectedAlbum.title,
      file: track.filePath,
      title: track.name,
      cover: this.selectedAlbum.cover
    });
  }

  toggleTrack() {
    if (this.playerService.state.playing){
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
}