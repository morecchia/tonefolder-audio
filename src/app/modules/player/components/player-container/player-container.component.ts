import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { SelectedFile } from 'src/app/shared/models/selected-file';

@Component({
  selector: 'app-player-container',
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.scss']
})
export class PlayerContainerComponent {
  get trackPlaying() { return this.playerService.audioState.playing; }
  get trackLoading() { return this.playerService.audioState.loading; }
  get selected() { return this.playerService.selectedFile; }
  get volume() { return this.playerService.getStoredVolume(); }
  get trackDuration() { return this.playerService.audioState.duration; }
  get trackDurationReadable() { return this.playerService.audioState.readableDuration || '00:00:00'; }
  get trackTime() { return this.playerService.audioState.currentTime; }
  get trackTimeReadable() { return this.playerService.audioState.readableCurrentTime || '00:00:00'; }
  get hasPlaylists() { return this.playlistService.playlists && this.playlistService.playlists.length > 0; }

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private playlistService: PlaylistService) { }

  trackSeek(value: number) {
    this.playerService.seek(value);
  }

  loadAlbum(selected: SelectedFile) {
    this.router.navigate(['/tracks', selected.track.album_id]);
  }
}
