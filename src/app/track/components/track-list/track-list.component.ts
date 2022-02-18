import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectedFile, TracksResponse } from '../../services/track.service';
import { StreamState } from '../../../player/services/audio.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
  @Input()
  playerState: StreamState;

  @Input()
  selectedAlbum: any;

  @Input()
  currentTrack: string;

  @Input()
  tracksResponse: TracksResponse;

  @Output()
  trackSelected = new EventEmitter<{track: string, cover: string}>();

  @Output()
  trackToggled = new EventEmitter<void>();

  @Output()
  trackQueued = new EventEmitter<SelectedFile>();

  playingIndex: number;

  get trackCount() { return this.selectedAlbum?.trackCount; }
  get coverArt() {
    return this.selectedAlbum && this.selectedAlbum.cover
      ? `/source/${this.selectedAlbum.title}/${this.selectedAlbum.cover}`
      : '/assets/images/subwoofer-100.png';
  }
  get album() {
    return this.selectedAlbum && this.selectedAlbum.title.split(' - ').reverse();
  }
  get tracks() { return this.tracksResponse.tracks.sort(); }

  selectTrack(track: string) {
    if (this.currentTrack === track) {
      this.trackToggled.emit();
    } else {
      this.trackSelected.emit({track, cover: this.coverArt});
    }
  }

  queueTrack(track: string) {
    this.trackQueued.emit({ album: this.selectedAlbum.title, track, cover: this.coverArt });
  }

  getDownloadLink(track: string) {
    return `/source/${this.selectedAlbum.title}/${track}`;
  }
}
