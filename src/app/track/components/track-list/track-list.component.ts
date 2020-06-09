import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { TracksResponse } from '../../services/track.service';
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

  query: string;
  filterForm: FormGroup;
  playingIndex: number;

  get trackCount() { return this.selectedAlbum?.trackCount; }
  get coverArt() {
    return this.selectedAlbum && this.selectedAlbum.cover
      ? `/source/${this.selectedAlbum.title}/${this.selectedAlbum.cover}`
      : '/assets/images/subwoofer-100.png';
  }
  get tracks() { return this.tracksResponse.tracks.sort(); }

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      trackFilter: ['']
    });

    this.filterForm.valueChanges.subscribe(f => {
      this.query = f.trackFilter;
    });
  }

  selectTrack(track: string) {
    const indexOfTrack = this.tracks.indexOf(track);

    if (this.playingIndex !== indexOfTrack) {
      this.playingIndex = indexOfTrack;
      this.trackSelected.emit({track, cover: this.tracksResponse.cover});
    } else {
      this.trackToggled.emit();
    }
  }

  getDownloadLink(track: string) {
    return `/source/${this.selectedAlbum.title}/${track}`;
  }
}
