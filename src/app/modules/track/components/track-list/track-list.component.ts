import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectedFile, TrackService } from 'src/app/core/services/track.service';
import { StreamState } from 'src/app/core/services/audio.service';
import { Album } from 'src/app/shared/models/album';
import { Track } from 'src/app/shared/models/track';

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
  trackSelected = new EventEmitter<Track>();

  @Output()
  trackToggled = new EventEmitter<void>();

  @Output()
  trackQueued = new EventEmitter<SelectedFile>();

  playingIndex: number;

  get trackCount() { return this.tracksResponse?.tracks.length; }
  get coverArt() {
    return this.tracksResponse && this.tracksResponse.cover
      ? `${environment.serviceUrl}/${this.tracksResponse.cover}`
      : `${environment.serviceUrl}/assets/images/subwoofer-100.png`;
  }
  get album() {
    return this.tracksResponse && this.tracksResponse.title;
  }
  get artist() {
    return this.tracksResponse && this.tracksResponse.artist;
  }
  get tracks() {
    return this.tracksResponse.tracks
      .sort((a: Track, b: Track) => a.order - b.order);
  }

  get loading() { return this.trackService.loading; }

  constructor(private trackService: TrackService) {}

  selectTrack(track: Track) {
    if (this.currentTrack === track.name) {
      this.trackToggled.emit();
    } else {
      this.trackSelected.emit(track);
    }
  }

  queueTrack(track: Track) {
    this.trackQueued.emit({
      albumId: this.selectedAlbum.id,
      album: this.selectedAlbum.title,
      title: track.name,
      file: track.filePath,
      cover: this.tracksResponse.cover,
    });
  }

  getDownloadLink(track: string) {
    return `/source/${this.selectedAlbum.title}/${track}`;
  }
}
