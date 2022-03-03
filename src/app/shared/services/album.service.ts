import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { handleError } from '../../../utils/handle-error';
import { Album, AlbumResponse } from 'src/app/shared/models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  currentAlbum: Album;

  constructor(private http: HttpClient) { }

  private onAlbumsFiltered = new Subject<string>();
  albumsFiltered$ = this.onAlbumsFiltered.asObservable();

  loadingError = new Subject<any>();
  loadingError$ = this.loadingError.asObservable();

  getAlbums(): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(`${environment.serviceUrl}/api/albums`)
      .pipe(catchError(err => {
        this.loadingError.next(err);
        return handleError(err);
      }));
  }

  getCurrentAlbum(albums: Album[]) {
    const storedAlbum = localStorage.getItem('tfa-current-album');
    return storedAlbum || albums[0];
  }

  selectAlbum(album: Album) {
    this.currentAlbum = album;
    localStorage.setItem('tfa-current-album', JSON.stringify(album));
  }

  filterAlbums(query: string) {
    this.onAlbumsFiltered.next(query);
  }
}
