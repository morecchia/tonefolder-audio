import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterPipe } from '../../../pipes/filter.pipe';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent {
  @Input()
  query: string;

  @Input()
  albumsRequest: any;

  @Output()
  albumSelected = new EventEmitter<string>();

  get albums() { return this.albumsRequest.albums.sort(); }
}
