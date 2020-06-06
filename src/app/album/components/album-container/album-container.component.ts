import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.albumsFiltered$.subscribe(q => this.query = q);
    this.albumsRequest$ = this.albumService.getAlbums()
      .pipe(tap(res => this.selectAlbum(res.albums.sort()[0])));
  }

  selectAlbum(album: string ) {
    this.albumService.selectAlbum(album);
  }
}
