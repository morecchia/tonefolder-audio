import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, finalize } from 'rxjs/operators';
import { Subject, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from 'src/app/shared/models/album';
import { BaseService } from './base.service';
import { Track } from 'src/app/shared/models/track';

export interface SelectedFile {
  file: string;
  title: string;
  albumId: number;
  album: string;
  cover: string;
}

export const imageFileTypes = ['.jpg', '.png'];
export const audioFileTypes = ['.mp3', '.wav'];

@Injectable({
  providedIn: 'root'
})
export class TrackService extends BaseService {
  loading: boolean;
  trackStorage: Album[] = [];
  albumTracks: SelectedFile[];
  currentTracks: SelectedFile[];
  selectedAlbum: Album;

  private fileSelected = new Subject<SelectedFile>();
  fileSelected$ = this.fileSelected.asObservable();

  trackRequested$ = new BehaviorSubject<Observable<any>>(null);

  constructor(private http: HttpClient, snackbar: MatSnackBar) {
    super(snackbar);
  }

  getTracks(albumId: number): Observable<Album> {
    const stored = this.trackStorage.find(ts => ts.id === albumId);

    if (stored) {
      this.selectedAlbum = stored;
      this.albumTracks = stored.tracks.map(track => ({
        albumId: stored.id,
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
          this.selectedAlbum = res;
          this.albumTracks = res?.tracks?.map(track => ({
            albumId: res.id,
            album: res.title,
            cover: res.cover,
            file: track.filePath,
            title: track.name
          }));
          this.currentTracks = this.albumTracks;
          this.addToStore(res);
          return res;
        }),
        finalize(() => this.loading = false),
        catchError(this.errorCallback));
  }

  saveTracks(files: File[], album: Album): Observable<any>[] {
    var requests = [];
    for (const [i,v] of files.entries()) {
      const start$ = of({inProgress: v.name});
      const track$ = this.http
        .post(`${environment.serviceUrl}/api/tracks`, {
          album_id: album.id,
          filePath: `source/${album.artist} - ${album.title}/${v.name}`,
          name: v.name,
          order: i,
        })
        .pipe(catchError(this.errorCallback));

      const formData = new FormData();
      formData.append('uploadFile', v, `${album.artist};${album.title};${v.name}`);

      const file$ = this.http
        .post(`${environment.serviceUrl}/api/uploads`, formData)
        .pipe(catchError(this.errorCallback));
      
      requests.push(start$, track$, file$);
    }
    return requests;
  }

  updateTrack(track: Track) {
    return this.http
      .put<Track>(`${environment.serviceUrl}/api/tracks/${track.id}`, track)
      .pipe(catchError(this.errorCallback));
  }

  selectTrack(file: SelectedFile, playlist?: SelectedFile[]) {
    this.currentTracks = playlist ? playlist : this.albumTracks;
    this.fileSelected.next(file);
  }

  private addToStore(album: Album) {
    const stored = this.trackStorage.find(ts => ts.id === album.id);
    if (!stored) {
      this.trackStorage.push(album);
    }
  }
}
