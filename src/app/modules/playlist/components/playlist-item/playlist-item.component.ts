import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectedFile } from 'src/app/shared/services/track.service';

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

  get cover() { return this.item && this.item.cover
    ? `${environment.serviceUrl}/${this.item.cover}`
    : `${environment.serviceUrl}/assets/images/subwoofer-100.png`; 
  }
}
