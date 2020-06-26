import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService } from '../../../player/services/audio.service';
import { PlayerService } from '../../../player/services/player.service';
import { TrackService } from '../../../track/services/track.service';
import { AlbumService } from '../../../album/services/album.service';

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
    private snackBar: MatSnackBar) {
    this.audioService.audioFailed$.subscribe(() => this.showError('Could not play track'));
    this.trackService.loadingError$.subscribe(() => this.showError('Could not load tracks'));
    this.albumService.loadingError$.subscribe(() => this.showError('Could not load albums'));
  }

  showError(message: string) {
    this.snackBar.open(message, 'Ok', {
      panelClass: 'error-state'
    });
  }

  private togglePlay() {
    if (this.playerService.state.playing) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }
}
