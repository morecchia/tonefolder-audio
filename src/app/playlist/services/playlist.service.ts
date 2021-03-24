import { Injectable } from '@angular/core';

export interface PlaylistItem {
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
    if (!this.playlist || !this.playlist.find(i => i.title === item.title)) {
      this.playlist.push(item);
    }
  }
}
