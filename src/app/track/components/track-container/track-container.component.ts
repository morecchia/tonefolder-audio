import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TrackService, TracksResponse } from '../../services/track.service';
import { AlbumService } from '../../../album/services/album.service';
import { PlayerService } from 'src/app/player/services/player.service';

@Component({
  selector: 'app-track-container',
  templateUrl: './track-container.component.html',
  styleUrls: ['./track-container.component.scss']
})
export class TrackContainerComponent {
  tracksResponse: Observable<TracksResponse>;

  get selectedAlbum() { return this.trackService.selectedAlbum; }
  get playerState() { return this.playerService.state; }
  get currentTrack() { return this.playerService.currentFile?.track; }

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private albumService: AlbumService,
    private playerService: PlayerService) {
    this.route.params.subscribe(params => {
      const album = params.name;
      this.tracksResponse = this.trackService.getTracks(album);
    });
    this.albumService.albumSelected$.subscribe(album => {
      this.tracksResponse = this.trackService.getTracks(album);
    });
  }

  selectTrack({track, cover}) {
    this.trackService.selectTrack({album: this.selectedAlbum.title, track, cover});
  }

  toggleTrack() {
    if (this.playerService.state.playing){
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }
}
