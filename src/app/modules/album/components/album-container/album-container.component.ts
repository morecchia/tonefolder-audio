import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/shared/services/album.service';
import { Observable } from 'rxjs';
import { Album } from 'src/app/shared/models/album';

@Component({
  selector: 'app-album-container',
  templateUrl: './album-container.component.html',
  styleUrls: ['./album-container.component.scss']
})
export class AlbumContainerComponent implements OnInit {
  albumsRequest$: Observable<Album[]>;
  query: string;

  constructor(private router: Router, private albumService: AlbumService) { }

  ngOnInit() {
    this.albumsRequest$ = this.albumService.getAlbums();
  }

  selectAlbum(album: Album) {
    this.albumService.selectAlbum(album);
    this.router.navigate(['/tracks', album.id]);
  }

  sortAlbums(sortBy: string){
    this.albumsRequest$ = this.albumService.getAlbums(sortBy);
  }
}
