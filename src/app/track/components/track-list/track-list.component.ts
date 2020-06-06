import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TracksResponse } from '../../services/track.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
  @Input()
  selectedAlbum: any;

  @Input()
  tracksResponse: TracksResponse;

  @Output()
  trackSelected = new EventEmitter<{track: string, cover: string}>();

  get trackCount() { return this.selectedAlbum?.trackCount; }
  get coverArt() {
    return this.selectedAlbum && this.selectedAlbum.cover
      ? `/source/${this.selectedAlbum.title}/${this.selectedAlbum.cover}`
      : '/assets/images/subwoofer-100.png';
  }
  get tracks() { return this.tracksResponse.tracks.sort(); }
}
