import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService } from '../../../player/services/audio.service';
import { PlayerService } from '../../../player/services/player.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent {
  title = 'tonefolder-audio';

  get fileSelected() { return this.playerService.selectedFile; }

  constructor(
    private audioService: AudioService,
    private playerService: PlayerService,
    private snackBar: MatSnackBar) {
      audioService.audioFailed$
        .subscribe(() => this.showError());
    }

  showError() {
    this.snackBar.open('Could not play track', 'Ok', {
      panelClass: 'error-state'
    });
  }
}
