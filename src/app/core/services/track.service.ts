import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, finalize } from 'rxjs/operators';
import { Subject, of, BehaviorSubject, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from 'src/app/shared/models/album';
import { BaseService } from './base.service';
import { Track } from 'src/app/shared/models/track';
import { PlayContext } from 'src/app/shared/models/play-context';
import { SelectedFile } from 'src/app/shared/models/selected-file';

export const imageFileTypes = ['.jpg', '.png'];
export const audioFileTypes = ['.mp3', '.wav'];

@Injectable({
  providedIn: 'root'
})
export class TrackService extends BaseService {
  loading: boolean;
  trackStorage: Album[] = [];
  albumTracks: SelectedFile[];
  selectedAlbum: Album;

  private fileSelected = new Subject<{file: SelectedFile, context: PlayContext}>();
  fileSelected$ = this.fileSelected.asObservable();

  trackRequested$ = new BehaviorSubject<Observable<any>>(null);
  tracksReordered$ = new BehaviorSubject<Track[]>(null);

  constructor(private http: HttpClient, snackbar: MatSnackBar) {
    super(snackbar);
  }

  getTracks(albumId: number): Observable<Album> {
    const stored = this.trackStorage.find(ts => ts.id === albumId);
    if (stored) {
      this.selectedAlbum = stored;
      this.albumTracks = stored.tracks.map(track => ({
        albumId: stored.id,
        albumTitle: stored.title,
        cover: stored.cover,
        track: track,
        order: track.order,
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
            albumTitle: res.title,
            cover: res.cover,
            track: track,
            order: track.order
          }));
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

  updateTracks(track: Track, order: {} = null, albumId: number = null) {
    const id = track ? track.id : 0;
    return this.http
      .put<Track>(`${environment.serviceUrl}/api/tracks/${id}`, {track, order, albumId})
      .pipe(catchError(this.errorCallback));
  }

  deleteTrack(track: Track) {
    return this.http.delete(`${environment.serviceUrl}/api/tracks/${track.id}`);
  }

  selectTrack(file: SelectedFile, context: PlayContext = PlayContext.album) {
    this.fileSelected.next({file, context});
  }

  reorderTracks(tracks: Track[]) {
    const order = this.generateOrderMap(tracks);
    return this.updateTracks(null, order, this.selectedAlbum.id);
  }

  private addToStore(album: Album) {
    const stored = this.trackStorage.find(ts => ts.id === album.id);
    if (!stored) {
      this.trackStorage.push(album);
    }
  }
}
