import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Album, AlbumResponse } from 'src/app/shared/models/album';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService {
  currentAlbum: Album;
  nextPageUrl: string;

  constructor(private http: HttpClient, snackbar: MatSnackBar) {
    super(snackbar);
  }

  albumsFiltered$ = new BehaviorSubject<string>('');
  albumsScrolled$ = new BehaviorSubject<void>(null);

  getAlbums(): Observable<Album[]> {
    const url = this.nextPageUrl || `${environment.serviceUrl}/api/albums`;
    return this.http.get<AlbumResponse>(url)
      .pipe(
        map(res => {
          this.nextPageUrl = res.next_page_url;
          return res.data;
        }),
        catchError(this.errorCallback)
      );
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
