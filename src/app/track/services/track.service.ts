import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppConfig } from '../../../config';

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
  currentAlbum: string;
  currentTracks: string[];

  private fileSelected = new Subject<SelectedFile>();
  fileSelected$ = this.fileSelected.asObservable();

  constructor(private http: HttpClient, private config: AppConfig) { }

  getTracks(album: string): Observable<TracksResponse> {
    return this.http
      .get<TracksResponse>(`${this.config.serviceUrl}/tracks.php?album=${album}`)
      .pipe(map(res => {
        this.albumTracks = res.tracks;
        return res;
      }));
  }

  selectTrack(file: SelectedFile) {
    this.currentTracks = this.albumTracks;
    this.fileSelected.next(file);
  }
}
