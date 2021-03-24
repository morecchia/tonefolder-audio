import { Component, EventEmitter, Input, OnInit, Output, HostBinding } from '@angular/core';
import { PlaylistItem } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent {
  downloadLink: string;

  @Input()
  playing: boolean;

  @Input()
  item: PlaylistItem;

  @Output()
  trackSelected = new EventEmitter<string>();

  @HostBinding('class') get HeadingClass() {
    return this.playing ? 'playing' : '';
  }
}
