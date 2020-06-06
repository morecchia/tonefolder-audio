import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TrackService, TracksResponse } from '../../services/track.service';
import { AlbumService } from '../../../album/services/album.service';

@Component({
  selector: 'app-track-container',
  templateUrl: './track-container.component.html',
  styleUrls: ['./track-container.component.scss']
})
export class TrackContainerComponent {
  tracksResponse: Observable<TracksResponse>;

  get selectedAlbum() { return this.trackService.selectedAlbum; }

  constructor(private trackService: TrackService, private albumService: AlbumService) {
    albumService.albumSelected$.subscribe(album => {
      this.tracksResponse = this.trackService.getTracks(album);
    });
  }

  selectTrack({track, cover}) {
    this.trackService.selectTrack({album: this.selectedAlbum.title, track, cover});
  }
}
