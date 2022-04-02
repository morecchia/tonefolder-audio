import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TrackService } from 'src/app/core/services/track.service';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { AuthService } from '@auth0/auth0-angular';
import { PlayContext } from 'src/app/shared/models/play-context';
import { SelectedFile } from 'src/app/shared/models/selected-file';
import { Playlist } from 'src/app/shared/models/playlist';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-playlist-container',
  templateUrl: './playlist-container.component.html',
  styleUrls: ['./playlist-container.component.scss'],
})
export class PlaylistContainerComponent {
  playlist$: Observable<Playlist>;
  selectedId: number;
  
  get hasTracks() { return this.playlistService.hasTracks; }
  get loggedIn$() { return this.auth.isAuthenticated$; }
  get playlists() { return this.playlistService.playlists; }

  constructor(
    private auth: AuthService,
    private playlistService: PlaylistService,
    private trackService: TrackService
  ) {
    if (this.playlists && this.playlists.length) {
      this.selectedId = this.playlists[0].id;
      this.playlist$ = this.playlistService.getPlaylist(this.selectedId);
    }
  }

  selectPlaylist(change: MatSelectChange) {
    this.selectedId = change.value;
    this.playlist$ = this.playlistService.getPlaylist(this.selectedId);
  }

  playItem(item: SelectedFile) {
    this.trackService.selectTrack(item, PlayContext.playlist);
  }

  clearPlaylist() {
    this.playlistService.clearPlaylist();
  }
}
