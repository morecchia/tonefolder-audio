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

  reorderPlaylist(current: number, item: SelectedFile) {
    const currentItem = Object.assign({}, this.playlist[current]);
    this.playlist.splice(current, 1, currentItem);
    this.playlistUpdated.next(item.track);
  }

  private itemExists(item: SelectedFile, source: SelectedFile): boolean {
    return `${source.album}-${source.track}` === `${item.album}-${item.track}`;
  }
}
