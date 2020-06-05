import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TracksResponse } from '../../services/track.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
  @Input()
  tracksResponse: TracksResponse;

  @Output()
  trackSelected = new EventEmitter<{track: string, cover: string}>();

  get tracks() { return this.tracksResponse.tracks.sort(); }
}
