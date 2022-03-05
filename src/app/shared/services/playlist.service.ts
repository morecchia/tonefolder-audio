import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SelectedFile } from 'src/app/shared/services/track.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService{
  playlist: SelectedFile[] = [];

  playlistUpdated$ = new BehaviorSubject<void>(null);

  constructor(snackbar: MatSnackBar) {
    super(snackbar);
    this.initPlaylist();
  }

  addItem(item: SelectedFile) {
    if (!this.playlist.find(i => this.itemExists(item, i))) {
      this.playlist.push(item);
    }

    this.playlistUpdated$.next();
    
    if (item.title) {
      this.showToast(`${item.title} added to playlist!`);
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
    this.playlistUpdated$.next();
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
