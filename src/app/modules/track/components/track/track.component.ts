import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
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
  trackEdit = new EventEmitter<void>();

  @HostBinding('class') get HeadingClass() {
    return this.playing ? 'playing' : '';
  }

  get loggedIn$() { return this.auth.isAuthenticated$; }

  constructor(private auth: AuthService) { }
}
