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

  updatePlaylist(playlistId: number, item: SelectedFile) {
    const { track, order } = item;
    return this.http.put<any>(`${environment.serviceUrl}/api/playlists/${playlistId}`, { track, order })
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
          this.playlistUpdated$.next();
          if (!this.itemExists(item)){
            this.showToast(`${track.name} added to playlist!`);
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
    return this.updatePlaylist(playlistId, currentItem);
  }

  private initPlaylist() {
    this.selectedPlaylistId = parseInt(localStorage.getItem('tfa-currentPlaylist'));
  }

  private itemExists(item: SelectedFile): boolean {
    const existing = this.playlist && this.playlist.find(t => t.track.id === item.track.id);
    return existing != null;
  }
}
