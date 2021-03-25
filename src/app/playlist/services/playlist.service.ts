import { Injectable } from '@angular/core';
import { SelectedFile } from 'src/app/track/services/track.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlist: SelectedFile[] = [];

  constructor() { }

  addItem(item: SelectedFile) {
    if (!this.playlist || !this.playlist.find(i => this.itemExists(item, i))) {
      this.playlist.push(item);
    }
  }

  clearPlaylist() {
    this.playlist = [];
  }

  private itemExists(item: SelectedFile, source: SelectedFile): boolean {
    return `${source.album}-${source.track}` === `${item.album}-${item.track}`;
  }
}
