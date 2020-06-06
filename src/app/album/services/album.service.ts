import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  currentAlbum: string;

  constructor(private http: HttpClient, private config: AppConfig) { }

  private albumSelected = new Subject<string>();
  albumSelected$ = this.albumSelected.asObservable();

  private onAlbumsFiltered = new Subject<string>();
  albumsFiltered$ = this.onAlbumsFiltered.asObservable();

  getAlbums(): Observable<any> {
    return this.http.get<any>(`${this.config.serviceUrl}/albums.php`);
  }

  getCurrentAlbum(albums: any[]) {
    const storedAlbum = localStorage.getItem('current-album');
    return storedAlbum || albums[0];
  }

  selectAlbum(album: string) {
    this.currentAlbum = album;
    localStorage.setItem('current-album', album);
    this.albumSelected.next(album);
  }

  filterAlbums(query: string) {
    this.onAlbumsFiltered.next(query);
  }
}
