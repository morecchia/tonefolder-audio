import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AudioService, StreamState } from './audio.service';
import { SelectedFile, TrackService } from '../../track/services/track.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  selectedFile: SelectedFile;
  currentFile: SelectedFile;
  state: StreamState;
  currentIndex = 0;

  get playlist() { return this.trackService.currentTracks; }

  constructor(
    private audioService: AudioService,
    private trackService: TrackService,
    private localStorage: LocalStorageService) {
    trackService.fileSelected$
      .subscribe(selected => {
        this.audioService.stop();
        this.selectedFile = selected;
        this.currentFile = selected;
        this.currentIndex = this.playlist ? this.playlist.indexOf(selected.track) : 0;
        this.load(`${selected.album}/${selected.track}`);
      });

    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
      });

    this.audioService.audioEnded$
      .subscribe(() => this.next());
  }

  load(track: string) {
    this.audioService
      .playStream(`/source/${track}`)
      .subscribe();
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  stop() {
    this.audioService.stop();
  }

  openFile(file: string) {
    this.audioService.stop();
    this.currentFile.track = file;
    this.load(`${this.currentFile.album}/${this.currentFile.track}`);
  }

  next() {
    if (this.currentIndex === this.playlist.length - 1) {
      return;
    }

    this.currentIndex = this.currentIndex + 1;
    const file = this.playlist[this.currentIndex];
    this.openFile(file);
  }

  previous() {
    if (this.currentIndex === 0) {
      this.seek(0);
      return;
    }

    this.currentIndex = this.currentIndex - 1;
    const file = this.playlist[this.currentIndex];
    this.openFile(file);
  }

  seek(seconds: number) {
    this.audioService.seekTo(seconds);
  }

  setVolume(volume: number, store = true) {
    const vol = volume / 100;
    const rounded = Math.round(vol * 10) / 10;
    this.audioService.setVolume(rounded);

    if (store) {
      this.localStorage.store('player-volume', volume);
    }
  }

  getStoredVolume() {
    return this.localStorage.retrieve('player-volume') || 50;
  }
}
