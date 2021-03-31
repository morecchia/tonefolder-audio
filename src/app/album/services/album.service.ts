import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { handleError } from '../../../utils/handle-error';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  currentAlbum: string;

  constructor(private http: HttpClient, private config: AppConfig) { }

  private onAlbumsFiltered = new Subject<string>();
  albumsFiltered$ = this.onAlbumsFiltered.asObservable();

  loadingError = new Subject<any>();
  loadingError$ = this.loadingError.asObservable();

  getAlbums(): Observable<any> {
    return this.http.get<any>(`${this.config.serviceUrl}/albums.php`)
      .pipe(catchError(err => {
        this.loadingError.next(err);
        return handleError(err);
      }));
  }

  getCurrentAlbum(albums: any[]) {
    const storedAlbum = localStorage.getItem('tfa-current-album');
    return storedAlbum || albums[0];
  }

  selectAlbum(album: string) {
    this.currentAlbum = album;
    localStorage.setItem('tfa-current-album', album);
  }

  filterAlbums(query: string) {
    this.onAlbumsFiltered.next(query);
  }
}
