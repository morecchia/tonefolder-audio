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

  constructor() {
    this.initPlaylist();
  }

  addItem(item: SelectedFile) {
    if (!this.playlist || !this.playlist.find(i => this.itemExists(item, i))) {
      this.playlist.push(item);
    }

    if (this.playlist?.length > 1) {
      this.playlistUpdated.next(item.title);
    }

    this.storePlaylist();
  }

  clearPlaylist() {
    this.playlist = [];
    localStorage.removeItem('tfa-playlist');
  }

  storePlaylist() {
    const pList = JSON.stringify(this.playlist);
    localStorage.setItem('tfa-playlist', pList);
  }

  reorderPlaylist(current: number, item: SelectedFile) {
    const currentItem = Object.assign({}, this.playlist[current]);
    this.playlist.splice(current, 1, currentItem);
    this.storePlaylist();
    this.playlistUpdated.next();
  }

  private initPlaylist() {
    const pListStr = localStorage.getItem('tfa-playlist');
    const playlist = JSON.parse(pListStr);
    this.playlist = playlist || [];
  }

  private itemExists(item: SelectedFile, source: SelectedFile): boolean {
    return `${source.album}-${source.title}` === `${item.album}-${item.title}`;
  }
}
