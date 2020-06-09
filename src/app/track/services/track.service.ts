import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppConfig } from '../../../config';
import { handleError } from '../../../utils/handle-error';

export interface SelectedFile {
  track: string;
  album: string;
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
  albumTracks: string[];
  currentTracks: string[];
  selectedAlbum: any;

  private fileSelected = new Subject<SelectedFile>();
  fileSelected$ = this.fileSelected.asObservable();

  loadingError = new Subject<any>();
  loadingError$ = this.loadingError.asObservable();

  constructor(private http: HttpClient, private config: AppConfig) { }

  getTracks(album: string): Observable<TracksResponse> {
    return this.http
      .get<TracksResponse>(`${this.config.serviceUrl}/tracks.php?album=${album}`)
      .pipe(
        map(res => {
          this.selectedAlbum = {
            title: album,
            cover: res?.cover,
            trackCount: res?.tracks.length,
          };
          this.albumTracks = res?.tracks;
          return res;
        }),
        catchError(err => {
          this.loadingError.next(err);
          return handleError(err);
        }));
  }

  selectTrack(file: SelectedFile) {
    this.currentTracks = this.albumTracks;
    this.fileSelected.next(file);
  }
}
