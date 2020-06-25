import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-album-container',
  templateUrl: './album-container.component.html',
  styleUrls: ['./album-container.component.scss']
})
export class AlbumContainerComponent implements OnInit{
  albumsRequest$: Observable<any>;
  query: string;
  albumFilter$: Observable<string>;

  constructor(private router: Router, private albumService: AlbumService) { }

  ngOnInit() {
    this.albumsRequest$ = this.albumService.getAlbums()
      .pipe(
        tap(res => {
          const album = this.albumService.getCurrentAlbum(res.albums);
          this.selectAlbum(album);
        })
      );
  }

  selectAlbum(album: string ) {
    this.albumService.selectAlbum(album);
    this.router.navigate(['/', encodeURIComponent(album)]);
  }
}
