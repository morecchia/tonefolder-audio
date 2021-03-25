import { Component } from '@angular/core';
import { PlayerService } from 'src/app/player/services/player.service';
import { SelectedFile, TrackService } from 'src/app/track/services/track.service';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-container',
  templateUrl: './playlist-container.component.html',
  styleUrls: ['./playlist-container.component.scss'],
})
export class PlaylistContainerComponent {
  get playlistItems() {
    return this.playlistService.playlist;
  }
  get currentTrack() {
    return this.player.currentFile?.track;
  }

  constructor(
    private playlistService: PlaylistService,
    private player: PlayerService,
    private trackService: TrackService
  ) {}

  playItem(item: SelectedFile) {
    this.trackService.selectTrack({album: item.album, track: item.track, cover: item.cover });
  }

  clearPlaylist() {
    this.playlistService.clearPlaylist();
  }
}
