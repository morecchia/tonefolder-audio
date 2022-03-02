import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AppConfig } from '../../../config';
import { handleError } from '../../../utils/handle-error';
import { Album } from 'src/app/_shared/models/album';

export interface SelectedFile {
  track: string;
  album: Album;
  cover: string;
}

export interface TrackStore {
  album: Album;
  tracks: string[];
  cover: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  trackStorage: TrackStore[] = [];

  albumTracks: SelectedFile[];
  currentTracks: SelectedFile[];
  selectedAlbum: any;

  private fileSelected = new Subject<SelectedFile>();
  fileSelected$ = this.fileSelected.asObservable();

  loadingError = new Subject<any>();
  loadingError$ = this.loadingError.asObservable();

  loading: boolean;

  constructor(private http: HttpClient, private config: AppConfig) { }

  getTracks(albumId: number): Observable<Album> {
    const stored = this.trackStorage.find(ts => ts.album.id === albumId);

    if (stored) {
      this.selectedAlbum = {
        title: stored.album,
        cover: stored.cover,
        trackCount: stored.tracks.length,
      };
      this.albumTracks = stored.tracks.map(track => ({ album: stored.album, track, cover: stored.cover }));
      return of(stored.album);
    }

    this.loading = true;

    return this.http
      .get<Album>(`${this.config.serviceUrl}/albums/${albumId}`)
      .pipe(
        map(res => {
          const cover = res?.cover;
          this.loading = false;
          this.selectedAlbum = res;
          this.albumTracks = res?.tracks.map(track => ({ album: res, track: track.name, cover: res.cover }));
          this.currentTracks = this.albumTracks;
          this.addToStore(res);
          return res;
        }),
        catchError(err => {
          this.loading = false;
          this.loadingError.next(err);
          return handleError(err);
        }));
  }

  selectTrack(file: SelectedFile, playlist?: SelectedFile[]) {
    this.currentTracks = playlist ? playlist : this.albumTracks;
    this.fileSelected.next(file);
  }

  private addToStore(album: Album) {
    const stored = this.trackStorage.find(ts => ts.album === album);
    if (!stored){
      this.trackStorage.push({
        album,
        tracks: album.tracks.map(t => t.name),
        cover: album.cover,
      });
    }
  }
}
