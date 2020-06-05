import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  currentAlbum: any;

  constructor(private http: HttpClient, private config: AppConfig) { }

  private albumSelected = new Subject<string>();
  albumSelected$ = this.albumSelected.asObservable();

  getAlbums(): Observable<any> {
    return this.http.get<any>(`${this.config.serviceUrl}/albums.php`);
  }

  selectAlbum(album: string) {
    this.currentAlbum = album;
    this.albumSelected.next(album);
  }
}
