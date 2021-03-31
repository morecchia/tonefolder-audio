import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AppConfig } from '../../../config';
import { handleError } from '../../../utils/handle-error';

export interface SelectedFile {
  track: string;
  album: string;
  cover: string;
}

export interface TrackStore {
  album: string;
  tracks: string[];
  cover: string;
}

export interface TracksResponse {
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

  getTracks(album: string): Observable<TracksResponse> {
    const stored = this.trackStorage.find(ts => ts.album === album);

    if (stored) {
      this.selectedAlbum = {
        title: album,
        cover: stored.cover,
        trackCount: stored.tracks.length,
      };
      this.albumTracks = stored.tracks.map(track => ({ album, track, cover: stored.cover }));
      return of({
        tracks: stored.tracks,
        cover: stored.cover,
      });
    }

    this.loading = true;

    return this.http
      .get<TracksResponse>(`${this.config.serviceUrl}/tracks.php?album=${album}`)
      .pipe(
        map(res => {
          const cover = res?.cover;
          this.loading = false;
          this.selectedAlbum = {
            title: album,
            cover: res?.cover,
            trackCount: res?.tracks.length,
          };
          this.albumTracks = res?.tracks.map(track => ({ album, track, cover: `/source/${album}/${cover}` }));
          this.currentTracks = this.albumTracks;
          this.addToStore(album, res);
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

  private addToStore(album: string, tracksResponse: TracksResponse) {
    const stored = this.trackStorage.find(ts => ts.album === album);
    if (!stored){
      this.trackStorage.push({
        album,
        tracks: tracksResponse.tracks,
        cover: tracksResponse.cover,
      });
    }
  }
}
