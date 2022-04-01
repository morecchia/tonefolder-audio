import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PlayerService } from 'src/app/core/services/player.service';
import { SelectedFile, TrackService } from 'src/app/core/services/track.service';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { AuthService } from '@auth0/auth0-angular';
import { PlayContext } from 'src/app/shared/models/play-context';

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
    return this.player.currentFile?.track.name;
  }

  get loggedIn$() { return this.auth.isAuthenticated$; }

  constructor(
    private auth: AuthService,
    private playlistService: PlaylistService,
    private player: PlayerService,
    private trackService: TrackService) { }

  playItem(item: SelectedFile) {
    this.trackService.selectTrack(item, PlayContext.playlist);
  }

  clearPlaylist() {
    this.playlistService.clearPlaylist();
  }

  drop(event: CdkDragDrop<SelectedFile[]>) {
    moveItemInArray(this.playlistItems, event.previousIndex, event.currentIndex);
    this.playlistService.reorderPlaylist(event.currentIndex);
  }
}
