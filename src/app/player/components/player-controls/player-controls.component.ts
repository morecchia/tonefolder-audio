import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { SelectedFile } from 'src/app/track/services/track.service';
import { StartTime } from '../player-time/player-time.component';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {
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
  get playlistIndex() { return this.playerService.currentIndex; }
  get skipDisabled() {
    return !this.playlist
      || !this.playlist.length
      || this.playlistIndex === this.playlist.length - 1;
  }

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.volume = this.playerService.getStoredVolume();
  }

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
}
