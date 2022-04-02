import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectedFile } from 'src/app/shared/models/selected-file';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Playlist } from 'src/app/shared/models/playlist';
import { map } from 'rxjs/operators';
import { Track } from 'src/app/shared/models/track';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService {
  playlists: Playlist[] = [];
  playlist: SelectedFile[] = [];
  hasTracks: boolean;

  playlistUpdated$ = new BehaviorSubject<void>(null);

  constructor(private http: HttpClient, snackbar: MatSnackBar) {
    super(snackbar);
    this.initPlaylist();
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${environment.serviceUrl}/api/playlists`)
      .pipe(map(res => {
        this.playlists = res;
        return res;
      }));
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<any>(`${environment.serviceUrl}/api/playlists/${id}`)
      .pipe(map(res => {
        this.hasTracks = res && res.tracks && res.tracks.length > 0;

        return Object.assign({}, res, {
          tracks: res.tracks.map((t: Track) => ({
            track: t,
            albumTitle: t.album.title,
            cover: t.album.cover
          }))
        });
      }));
  }

  createPlaylist(playlist: Playlist) {
    return this.http.post(`${environment.serviceUrl}/api/playlists`, playlist);
  }

  addItem(id: number, item: SelectedFile) {
    if (!this.playlist.find(i => this.itemExists(item, i))) {
      this.playlist.push(item);
    }

    this.playlistUpdated$.next();
    
    if (item.track) {
      this.showToast(`${item.track.name} added to playlist!`);
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

  reorderPlaylist(current: number) {
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
    return item.track.id === source.track.id;
  }
}
