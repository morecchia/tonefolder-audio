import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlaylistItem } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {
  downloadLink: string;

  playing: boolean;

  @Input()
  item: PlaylistItem;

  @Output()
  trackSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
}
