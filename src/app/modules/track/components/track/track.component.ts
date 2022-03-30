import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  @Input()
  loggedIn: boolean;

  @Input()
  track: Track;

  @Input()
  playing: boolean;

  @Input()
  downloadLink: string;

  @Output()
  trackSelected = new EventEmitter<void>();

  @Output()
  trackQueued = new EventEmitter<void>();

  @Output()
  trackDeleted = new EventEmitter<void>();

  @Output()
  trackEdit = new EventEmitter<void>();

  @HostBinding('class') get HeadingClass() {
    return this.playing ? 'playing' : '';
  }
}
