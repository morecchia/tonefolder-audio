import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/shared/services/album.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { SelectedFile } from 'src/app/shared/services/track.service';

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

  loadAlbum(selected: SelectedFile) {
    const album = this.albumService.albums.find(a => a.id == selected.albumId);
    this.albumService.selectAlbum(album);
    this.router.navigate(['/tracks', selected.albumId]);
  }
}
