import { Injectable } from '@angular/core';

export interface PlaylistItem {
  album: string;
  title: string;
  cover: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlist: PlaylistItem[] = [];

  constructor() { }

  addItem(item: PlaylistItem) {
    if (!this.playlist || !this.playlist.find(i => this.itemExists(item, i))) {
      this.playlist.push(item);
    }
  }

  clearPlaylist() {
    this.playlist = [];
  }

  private itemExists(item: PlaylistItem, source: PlaylistItem): boolean {
    return `${source.album}-${source.title}` === `${item.album}-${item.title}`
  }
}
