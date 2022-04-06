import { Component, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { TrackService } from 'src/app/core/services/track.service';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { AuthService } from '@auth0/auth0-angular';
import { PlayContext } from 'src/app/shared/models/play-context';
import { SelectedFile } from 'src/app/shared/models/selected-file';
import { Playlist } from 'src/app/shared/models/playlist';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-container',
  templateUrl: './playlist-container.component.html',
  styleUrls: ['./playlist-container.component.scss'],
})
export class PlaylistContainerComponent implements OnDestroy {
  playlist$: Observable<Playlist>;
  selectedId: number;
  
  get hasTracks() { return this.playlistService.hasTracks; }
  get loggedIn$() { return this.auth.isAuthenticated$; }
  get playlists() { return this.playlistService.playlists; }

  private _destroy = new Subject();
  
  constructor(
    private auth: AuthService,
    private playlistService: PlaylistService,
    private trackService: TrackService
  ) {
    this.selectedId = this.playlistService.selectedPlaylistId;
    this.playlist$ = this.playlistService.getPlaylist(this.selectedId);
    this.playlistService.playlistUpdated$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.loadPlaylist());
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  selectPlaylist(change: MatSelectChange) {
    this.selectedId = change.value;
    this.playlist$ = this.playlistService.getPlaylist(this.selectedId);
  }

  reorderPlaylist(index: number) {
    this.playlistService.reorderPlaylist(index, this.selectedId).subscribe();
  }

  playItem(item: SelectedFile) {
    this.trackService.selectTrack(item, PlayContext.playlist);
  }

  clearPlaylist() {
    this.playlistService.clearPlaylist();
  }

  private loadPlaylist() {
    const current = this.playlistService.playlists.find(p => p.id === this.selectedId);
    if (this.playlistService.playlist && this.playlistService.playlist.length) {
      this.playlist$ = of({
        id: this.selectedId,
        name: current.name,
        tracks: this.playlistService.playlist,
        created_at: current.created_at,
      });
    }
  }
}
