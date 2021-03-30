import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
  
  private playlistUpdated = new Subject<string>();
  playlistUpdated$ = this.playlistUpdated.asObservable();

  constructor() { }

  addItem(item: PlaylistItem) {
    if (!this.playlist || !this.playlist.find(i => this.itemExists(item, i))) {
      this.playlist.push(item);
    }

    this.playlistUpdated.next(item.title);
  }

  clearPlaylist() {
    this.playlist = [];
  }

  private itemExists(item: PlaylistItem, source: PlaylistItem): boolean {
    return `${source.album}-${source.title}` === `${item.album}-${item.title}`
  }
}
