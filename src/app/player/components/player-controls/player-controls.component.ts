import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { PlayerService } from '../../services/player.service';
import { SelectedFile } from 'src/app/track/services/track.service';
import { StartTime } from '../player-time/player-time.component';
import { PlaylistContainerComponent } from 'src/app/playlist/components/playlist-container/playlist-container.component';
import { PlaylistDialogService } from 'src/app/playlist/services/playlist-dialog.service';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent {
  @Input()
  playing: boolean;

  @Input()
  loading: boolean;

  @Input()
  currentFile: SelectedFile;

  @Input()
  volume: number;

  @Input()
  playerTime: number;

  @Input()
  playerTimeFormatted: string;

  @Input()
  duration: number;

  @Input()
  durationFormatted: string;

  @Output()
  trackSeek = new EventEmitter<StartTime>();

  @Output()
  volumeSet = new EventEmitter<number>();

  volumeVisible: boolean;

  get playlist() { return this.playerService.playlist; }
  get playlistState() { return this.playlistDialog.dialogRef && this.playlistDialog.dialogRef.getState(); }
  get playlistIndex() { return this.playerService.currentIndex; }
  get skipDisabled() {
    return !this.playlist
      || !this.playlist.length
      || this.playlistIndex === this.playlist.length - 1;
  }

  constructor(
    private playerService: PlayerService,
    private playlistDialog: PlaylistDialogService,
    private dialog: MatDialog) { }

  play() {
    this.playing = true;
    this.playerService.play();
  }

  pause() {
    this.playing = false;
    this.playerService.pause();
  }

  skipNext() {
    this.playerService.next();
  }

  skipPrev() {
    this.playerService.previous();
  }

  setVolume(value: number){
    this.playerService.setVolume(value, true);
  }

  toggleVolume() {
    const storedVolume = this.playerService.getStoredVolume() || 50;
    this.volume = this.volume === 0 ? storedVolume : 0;
    this.playerService.setVolume(this.volume, false);
  }

  togglePlaylist() {
    if (this.playlistState === MatDialogState.OPEN) {
      this.closePlaylist();
    } else {
      this.openPlaylist();
    }
  }

  openPlaylist() {
    this.playlistDialog.openPlaylist();
  }

  closePlaylist() {
    this.playlistDialog.dialogRef.close();
  }
}
