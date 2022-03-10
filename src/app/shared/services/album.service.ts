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
  albums: Album[] = [];
  currentAlbum: Album;
  currentPage: number;
  nextPageUrl: string;

  constructor(private http: HttpClient, snackbar: MatSnackBar) {
    super(snackbar);
  }

  albumsFiltered$ = new BehaviorSubject<string>('');
  albumsScrolled$ = new BehaviorSubject<number>(null);

  getAlbums(sortBy: string = null, q: string = null, page: number = null): Observable<Album[]> {
    const sortParam = sortBy ? `?sortBy=${sortBy}` : '';
    const qParam = q ? `&q=${q}` : '';
    const pageParam = this.nextPageUrl && page ? `&page=${page}` : '';
    const url = `${environment.serviceUrl}/api/albums`;
    return this.http.get<AlbumResponse>(`${url}${sortParam}${qParam}${pageParam}`)
      .pipe(
        map(res => {
          this.currentPage = res.current_page;
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
