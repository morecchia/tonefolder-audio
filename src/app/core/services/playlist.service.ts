import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { SelectedFile } from 'src/app/shared/models/selected-file';
import { environment } from 'src/environments/environment';
import { Playlist } from 'src/app/shared/models/playlist';
import { Track } from 'src/app/shared/models/track';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService {
  playlists: Playlist[] = [];
  playlist: SelectedFile[] = [];
  selectedPlaylistId: number;
  hasTracks: boolean;

  playlistUpdated$ = new BehaviorSubject<Playlist>(null);
  playlistReordered$ = new BehaviorSubject<SelectedFile[]>(null);

  constructor(private http: HttpClient, snackbar: MatSnackBar) {
    super(snackbar);
  }
  
  initPlaylist() {
    const stored = localStorage.getItem('tfa-currentPlaylist');
    this.selectedPlaylistId = stored ? parseInt(stored) : null;
    return this.selectedPlaylistId ? this.getPlaylist(this.selectedPlaylistId) : EMPTY;
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${environment.serviceUrl}/api/playlists`)
      .pipe(map(res => {
        this.playlists = res;
        return res;
      }));
  }

  getPlaylist(id: number): Observable<Playlist> {
    if (id === this.selectedPlaylistId && this.playlist.length) {
      const current = this.playlists.find(p => p.id === id);
      return of(Object.assign({}, current, {
        tracks: this.playlist
      }));
    }

    return this.http.get<any>(`${environment.serviceUrl}/api/playlists/${id}`)
      .pipe(map(res => {
        this.hasTracks = res && res.tracks && res.tracks.length > 0;
        this.selectedPlaylistId = res.id;
        localStorage.setItem('tfa-currentPlaylist', `${this.selectedPlaylistId}`);
        this.playlist = res.tracks.map((t: Track) => ({
          track: t,
          albumTitle: t.album.title,
          cover: t.album.cover,
          order: t.pivot.order
        }));
        return Object.assign({}, res, {
          tracks: this.playlist
        });
      }));
  }

  createPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(`${environment.serviceUrl}/api/playlists`, playlist)
      .pipe(map(res => {
        this.playlists.push(res);
        return res;
      }));
  }

  updatePlaylist(playlistId: number, item: SelectedFile, ordered: {}) {
    const track = item ? item.track : null;
    return this.http.put<any>(`${environment.serviceUrl}/api/playlists/${playlistId}`, { track, ordered })
      .pipe(
        map(res => {
          this.playlist = res.tracks.map((t: Track) => ({
            track: t,
            albumTitle: t.album.title,
            cover: t.album.cover,
            order: t.pivot.order
          }));
          this.playlistUpdated$.next(Object.assign({}, res, {
            tracks: this.playlist
          }));
          return Object.assign({}, res, {
            tracks: this.playlist
          });
        }));
  }

  clearPlaylist(id: number) {
    const currentPlaylist = this.playlists.find(p => p.id === this.selectedPlaylistId);
    this.playlistUpdated$.next(Object.assign({}, currentPlaylist, {
      tracks: []
    }));
    return this.http.delete(`${environment.serviceUrl}/api/playlists/${id}?delete=false`);
  }

  appendPlaylist(playlistId: number, item: SelectedFile) {
    const currentPlaylist = this.playlists.find(p => p.id === this.selectedPlaylistId);

    if (this.itemExists(item, this.playlist)){
      return of(Object.assign({}, currentPlaylist, {
        tracks: this.playlist
      }));
    }

    item.order = this.playlist.length - 1;
    
    const ordered = {};
    ordered[item.track.id] = item.order;

    this.playlist.push(item);

    this.playlistUpdated$.next(Object.assign({}, currentPlaylist, {
      tracks: this.playlist
    }));

    this.showToast(`${item.track.name} added to playlist!`);

    return this.updatePlaylist(playlistId, item, ordered);
  }

  reorderPlaylist(playlist: SelectedFile[], playlistId: number) {
    const order = this.generateOrderMap(playlist.map(p => p.track));
    return this.updatePlaylist(playlistId, null, order);
  }

  private itemExists(item: SelectedFile, playlist: SelectedFile[]): boolean {
    const existing = playlist && playlist.find(t => t.track.id === item.track.id);
    return existing != null;
  }
}
