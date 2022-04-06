import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SelectedFile } from 'src/app/shared/models/selected-file';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Playlist } from 'src/app/shared/models/playlist';
import { finalize, map } from 'rxjs/operators';
import { Track } from 'src/app/shared/models/track';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService {
  playlists: Playlist[] = [];
  playlist: SelectedFile[] = [];
  selectedPlaylistId: number;
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

  updatePlaylist(playlistId: number, item: SelectedFile, ordered: {} = null) {
    const oldPlaylist = [...this.playlist];
    if (ordered === null) { // add the item to the end of the playlist
      this.playlist.push(item);
      ordered = {};
      ordered[item.track.id] = this.playlist.length - 1;
    }

    return this.http.put<any>(`${environment.serviceUrl}/api/playlists/${playlistId}`, { track: item.track, ordered })
      .pipe(
        map(res => {
          this.playlist = res.tracks.map((t: Track) => ({
            track: t,
            albumTitle: t.album.title,
            cover: t.album.cover,
            order: t.pivot.order
          }));
          return Object.assign({}, res, {
            tracks: this.playlist
          });
        }),
        finalize(() => {
          if (!this.itemExists(item, oldPlaylist)){
            this.playlistUpdated$.next();
            this.showToast(`${item.track.name} added to playlist!`);
          }
        }));
  }

  clearPlaylist() {

  }

  reorderPlaylist(index: number, playlistId: number) {
    const currentItem = Object.assign({}, this.playlist[index], {
      order: index,
    });
    this.playlist.splice(index, 1, currentItem);
    const order = this.generateOrderMap(this.playlist);
    return this.updatePlaylist(playlistId, currentItem, order);
  }

  private initPlaylist() {
    this.selectedPlaylistId = parseInt(localStorage.getItem('tfa-currentPlaylist'));
  }

  private itemExists(item: SelectedFile, playlist: SelectedFile[]): boolean {
    const existing = playlist && playlist.find(t => t.track.id === item.track.id);
    return existing != null;
  }

  private generateOrderMap(playlist: SelectedFile[]) {
    const ordered = {};
    for (let [i, v] of playlist.entries()) {
      ordered[v.track.id] = i;
    }
    return ordered;
  }
}
