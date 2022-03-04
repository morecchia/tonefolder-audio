import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from 'src/app/shared/models/album';
import { BaseService } from './base.service';

export interface SelectedFile {
  file: string;
  title: string;
  album: string;
  cover: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService extends BaseService {
  trackStorage: Album[] = [];
  albumTracks: SelectedFile[];
  currentTracks: SelectedFile[];
  selectedAlbum: Album;

  private fileSelected = new Subject<SelectedFile>();
  fileSelected$ = this.fileSelected.asObservable();

  loading: boolean;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
    super(snackbar);
  }

  getTracks(albumId: number): Observable<Album> {
    const stored = this.trackStorage.find(ts => ts.id === albumId);

    if (stored) {
      this.selectedAlbum = stored;
      this.albumTracks = stored.tracks.map(track => ({
        album: stored.title,
        file: track.filePath,
        cover: stored.cover,
        title: track.name
      }));

      return of(stored);
    }

    this.loading = true;

    return this.http
      .get<Album>(`${environment.serviceUrl}/api/albums/${albumId}`)
      .pipe(
        map(res => {
          this.loading = false;
          this.selectedAlbum = res;
          this.albumTracks = res?.tracks.map(track => ({
            album: res.title,
            cover: res.cover,
            file: track.filePath,
            title: track.name
          }));
          this.currentTracks = this.albumTracks;
          this.addToStore(res);
          return res;
        }),
        catchError(this.errorCallback));
  }

  selectTrack(file: SelectedFile, playlist?: SelectedFile[]) {
    this.currentTracks = playlist ? playlist : this.albumTracks;
    this.fileSelected.next(file);
  }

  private addToStore(album: Album) {
    const stored = this.trackStorage.find(ts => ts.id === album.id);
    if (!stored){
      this.trackStorage.push(album);
    }
  }
}
