import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent {
  @Input()
  albumsRequest: any;

  @Output()
  albumSelected = new EventEmitter<string>();

  filterForm: FormGroup;
  query: string;

  get albums() {
    return this.albumsRequest.albums
      .sort((a: string, b: string) =>
        a.toLowerCase().localeCompare(b.toLowerCase()));
  }

  get currentAlbum() { return this.albumService.currentAlbum; }

  constructor(private fb: FormBuilder, private albumService: AlbumService) {
    this.filterForm = this.fb.group({
      albumFilter: ['']
    });

    this.filterForm.valueChanges.subscribe(f => {
      this.query = f.albumFilter;
    });
  }
}
