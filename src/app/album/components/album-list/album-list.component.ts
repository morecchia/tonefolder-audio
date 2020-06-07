import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterPipe } from '../../../pipes/filter.pipe';

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
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      albumFilter: ['']
    });

    this.filterForm.valueChanges.subscribe(f => {
      this.query = f.albumFilter;
    });
  }
}
