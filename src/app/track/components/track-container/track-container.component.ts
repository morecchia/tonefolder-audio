import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectedFile, TrackService, TracksResponse } from '../../services/track.service';
import { PlayerService } from '../../../player/services/player.service';
import { PlaylistService } from '../../../playlist/services/playlist.service';
import { PlaylistDialogService } from 'src/app/playlist/services/playlist-dialog.service';

@Component({
  selector: 'app-track-container',
  templateUrl: './track-container.component.html',
  styleUrls: ['./track-container.component.scss']
})
export class TrackContainerComponent {
  tracksResponse: Observable<TracksResponse>;

  get selectedAlbum() { return this.trackService.selectedAlbum; }
  get playerState() { return this.playerService.state; }
  get currentTrack() { return this.playerService.currentFile?.track; }

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private playlistDialog: PlaylistDialogService) {
    this.route.params.subscribe(params => {
      const album = decodeURIComponent(params.name);
      this.tracksResponse = this.trackService.getTracks(album);
    });
  }

  selectTrack({track, cover}) {
    this.trackService.selectTrack({album: this.selectedAlbum.title, track, cover});
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
      this.trackService.selectTrack({album: this.selectedAlbum.title, track: item.track, cover: item.cover});
      this.playlistDialog.openPlaylist();
    }
  }
}
