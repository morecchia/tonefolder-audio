import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Album, AlbumResponse } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/shared/services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent {
  @Input()
  albumsRequest: AlbumResponse;

  @Output()
  albumSelected = new EventEmitter<number>();

  filterForm: FormGroup;
  query: string;

  get albums() {
    return this.albumsRequest.data
      .sort((a: Album, b: Album) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
  }

  get currentAlbum() { return this.albumService.currentAlbum; }
  get focusChange() { return this.albumService.focusChange$; }

  constructor(private fb: FormBuilder, private albumService: AlbumService) {
    this.filterForm = this.fb.group({
      albumFilter: ['']
    });

    this.filterForm.valueChanges.subscribe(f => {
      this.query = f.albumFilter;
    });
  }
}
