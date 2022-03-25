import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Album, AlbumResponse } from 'src/app/shared/models/album';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService {
  loading: boolean;
  albums: Album[] = [];
  currentPage: number;
  nextPageUrl: string;
  sorts = [{
    label: 'Artist',
    value: 'artist'
  }, {
    label: 'Title',
    value: 'title'
  }, {
    label: 'Date Added',
    value: 'created_at'
  }];

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
    this.loading = true;
    return this.http.get<AlbumResponse>(`${url}${sortParam}${qParam}${pageParam}`)
      .pipe(
        map(res => {
          this.currentPage = res.current_page;
          this.nextPageUrl = res.next_page_url;
          return res.data;
        }),
        finalize(() => this.loading = false),
        catchError(this.errorCallback)
      );
  }

  filterAlbums(query: string) {
    this.albumsFiltered$.next(query);
  }

  createAlbum(album: Album, cover: File) {
    return this.http.post<Album>(`${environment.serviceUrl}/api/albums`, album)
      .pipe(
        switchMap(res => this.uploadCover(res, cover)),
        catchError(this.errorCallback)
      );
  }

  updateAlbum(album: Album, cover: File) {
    return this.http.put<Album>(`${environment.serviceUrl}/api/albums/${album.id}`, album)
      .pipe(
        switchMap(res => this.uploadCover(res, cover)),
        catchError(this.errorCallback)
      );
  }

  uploadCover(album: Album, cover: File) {
    if (!cover) {
      return of(album);
    }
    
    const formData = new FormData();
    formData.append('uploadFile', cover, `${album.artist};${album.title};${cover.name}`);

    return this.http
      .post(`${environment.serviceUrl}/api/uploads`, formData)
      .pipe(
        map(() => album),
        catchError(this.errorCallback)
      );
  }

  getCoverPath(filename: string, artist: string, title: string) {
    return `source/${artist} - ${title}/${filename}`;
  }
}
