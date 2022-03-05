import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Album, AlbumResponse } from 'src/app/shared/models/album';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService {
  currentAlbum: Album;

  constructor(private http: HttpClient, snackbar: MatSnackBar) {
    super(snackbar);
  }

  albumsFiltered$ = new BehaviorSubject<string>('');

  getAlbums(): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(`${environment.serviceUrl}/api/albums`)
      .pipe(catchError(this.errorCallback));
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
    this.albumsFiltered$.next(query);
  }

  createAlbum(album: Album) {
    return this.http.post<any>(`${environment.serviceUrl}/api/albums`, album)
      .pipe(catchError(this.errorCallback));
  }
}
