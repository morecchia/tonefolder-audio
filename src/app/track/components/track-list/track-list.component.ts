import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectedFile } from '../../services/track.service';
import { StreamState } from '../../../player/services/audio.service';
import { Album } from 'src/app/_shared/models/album';
import { Track } from 'src/app/_shared/models/track';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
  @Input()
  playerState: StreamState;

  @Input()
  selectedAlbum: Album;

  @Input()
  currentTrack: string;

  @Input()
  tracksResponse: Album;

  @Output()
  trackSelected = new EventEmitter<{track: string, cover: string}>();

  @Output()
  trackToggled = new EventEmitter<void>();

  @Output()
  trackQueued = new EventEmitter<SelectedFile>();

  playingIndex: number;

  get trackCount() { return this.selectedAlbum?.tracks.length; }
  get coverArt() {
    return this.selectedAlbum && this.selectedAlbum.cover
      ? `/source/${this.selectedAlbum.cover}`
      : '/assets/images/subwoofer-100.png';
  }
  get album() {
    return this.selectedAlbum && this.selectedAlbum.title.split(' - ').reverse();
  }
  get tracks() { 
    return this.tracksResponse.tracks
      .sort((a: Track, b: Track) => b.order - a.order);
  }

  selectTrack(track: string) {
    if (this.currentTrack === track) {
      this.trackToggled.emit();
    } else {
      this.trackSelected.emit({track, cover: this.coverArt});
    }
  }

  queueTrack(track: string) {
    this.trackQueued.emit({ album: this.selectedAlbum, track, cover: this.coverArt });
  }

  getDownloadLink(track: string) {
    return `/source/${this.selectedAlbum.title}/${track}`;
  }
}
