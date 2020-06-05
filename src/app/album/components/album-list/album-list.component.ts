import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  @Input()
  albumsRequest: any;

  @Output()
  albumSelected = new EventEmitter<string>();

  get albums() { return this.albumsRequest.albums.sort(); }

  constructor() { }

  ngOnInit(): void {
  }

}
