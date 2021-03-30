import { Injectable } from '@angular/core';
import { SelectedFile } from 'src/app/track/services/track.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlist: SelectedFile[] = [];

  private playlistUpdated = new Subject<string>();
  playlistUpdated$ = this.playlistUpdated.asObservable();

  constructor() { }

  addItem(item: SelectedFile) {
    if (!this.playlist || !this.playlist.find(i => this.itemExists(item, i))) {
      this.playlist.push(item);
    }

    this.playlistUpdated.next(item.track);
  }

  clearPlaylist() {
    this.playlist = [];
  }

  private itemExists(item: SelectedFile, source: SelectedFile): boolean {
    return `${source.album}-${source.track}` === `${item.album}-${item.track}`;
  }
}
