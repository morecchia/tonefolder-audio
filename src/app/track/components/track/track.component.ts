import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  @Input()
  title: string;

  @Input()
  playing: boolean;

  @Input()
  downloadLink: string;

  @Output()
  trackSelected = new EventEmitter<string>();

  @Output()
  trackQueued = new EventEmitter<string>();

  @HostBinding('class') get HeadingClass() {
    return this.playing ? 'playing' : '';
  }
}
