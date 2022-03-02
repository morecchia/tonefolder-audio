import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/_shared/models/album';
import { AlbumService } from '../../../album/services/album.service';
import { PlayerService } from '../../../player/services/player.service';

@Component({
  selector: 'app-player-container',
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.scss']
})
export class PlayerContainerComponent {
  get trackPlaying() { return this.playerService.state.playing; }
  get trackLoading() { return this.playerService.state.loading; }
  get selected() { return this.playerService.selectedFile; }
  get volume() { return this.playerService.getStoredVolume(); }
  get trackDuration() { return this.playerService.state.duration; }
  get trackDurationReadable() { return this.playerService.state.readableDuration || '00:00:00'; }
  get trackTime() { return this.playerService.state.currentTime; }
  get trackTimeReadable() { return this.playerService.state.readableCurrentTime || '00:00:00'; }

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private albumService: AlbumService) { }

  trackSeek(value: number) {
    this.playerService.seek(value);
  }

  loadAlbum(album: Album) {
    this.albumService.selectAlbum(album);
    this.router.navigate(['/tracks', album.id]);
  }
}
