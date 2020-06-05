import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
