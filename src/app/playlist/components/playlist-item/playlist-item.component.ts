import { Component, EventEmitter, Input, OnInit, Output, HostBinding } from '@angular/core';
import { SelectedFile } from 'src/app/track/services/track.service';

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
  item: SelectedFile;

  @Output()
  trackSelected = new EventEmitter<string>();

  @HostBinding('class') get HeadingClass() {
    return this.playing ? 'playing' : '';
  }
}
