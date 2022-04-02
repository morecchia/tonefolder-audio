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
        this.playlist = res.tracks.map((t: Track) => ({
          track: t,
          albumTitle: t.album.title,
          cover: t.album.cover
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

  addItem(id: number, item: SelectedFile) {
    return this.http.put<Playlist>(`${environment.serviceUrl}/api/playlists/${id}`, { track: item.track })
      .pipe(finalize(() => {
        this.playlistUpdated$.next();
        if (item.track) {
          this.showToast(`${item.track.name} added to playlist!`);
        }
        this.storePlaylist();
      }));
  }

  clearPlaylist() {

  }

  storePlaylist() {

  }

  reorderPlaylist(current: number) {

  }

  private initPlaylist() {

  }

  private itemExists(item: SelectedFile, source: SelectedFile): boolean {
    return item.track.id === source.track.id;
  }
}
