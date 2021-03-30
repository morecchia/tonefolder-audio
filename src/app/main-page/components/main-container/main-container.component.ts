import { Component, HostListener } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AudioService } from '../../../player/services/audio.service';
import { PlayerService } from '../../../player/services/player.service';
import { TrackService } from '../../../track/services/track.service';
import { AlbumService } from '../../../album/services/album.service';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent {
  get fileSelected() { return this.playerService.selectedFile; }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 32 && this.fileSelected) {
      event.preventDefault();
      this.togglePlay();
    }
  }

  constructor(
    private trackService: TrackService,
    private albumService: AlbumService,
    private audioService: AudioService,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar) {
    this.audioService.audioFailed$.subscribe(() => this.showToast('Could not play track', 'error-state'));
    this.trackService.loadingError$.subscribe(() => this.showToast('Could not load tracks', 'error-state'));
    this.albumService.loadingError$.subscribe(() => this.showToast('Could not load albums', 'error-state'));
    this.playlistService.playlistUpdated$.subscribe(title => this.showToast(`${title} added to playlist!`));
  }

  showToast(message: string, state?: string) {
    const options: MatSnackBarConfig = state ? { panelClass: state, duration: 2000 } : { duration: 2000 };
    this.snackBar.open(message, 'Ok', options);
  }

  private togglePlay() {
    if (this.playerService.state.playing) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }
}
