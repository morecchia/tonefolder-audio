import { Injectable } from '@angular/core';
import { AudioService, StreamState } from './audio.service';
import { SelectedFile, TrackService } from '../../track/services/track.service';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  selectedFile: SelectedFile;
  currentFile: SelectedFile;
  state: StreamState;
  currentVolume: number;
  currentIndex = 0;

  get playlist() {
    return this.playlistService.playlist && this.playlistService.playlist.length
      ? this.playlistService.playlist
      : this.trackService.currentTracks;
  }

  constructor(
    private audioService: AudioService,
    private trackService: TrackService,
    private playlistService: PlaylistService) {
    this.currentVolume = this.getStoredVolume();
    this.selectedFile = JSON.parse(localStorage.getItem('tfa-lastPlayed'));
    this.trackService.fileSelected$
      .subscribe(selected => {
        this.audioService.stop();
        this.selectedFile = selected;
        this.currentFile = selected;
        this.currentIndex = this.playlist ? this.playlist.findIndex(i => i.track === selected.track) : 0;
        this.load(`${selected.album}/${selected.track}`);
        localStorage.setItem('tfa-lastPlayed', JSON.stringify(this.currentFile));
      });

    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
      });

    this.audioService.audioEnded$
      .subscribe(() => this.next());

    this.playlistService.playlistUpdated$
      .subscribe(() => {
        this.currentIndex = this.playlist.findIndex(i => this.currentFile && i.track === this.currentFile.track);
      });
  }

  load(track: string) {
    if (this.currentVolume > 0) {
      this.setVolume(this.getStoredVolume(), false);
    }

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

  openFile(file: SelectedFile) {
    this.audioService.stop();
    this.currentFile = file;
    this.selectedFile = file;
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
    this.currentVolume = rounded;

    if (store) {
      localStorage.setItem('tfa-player-volume', volume.toString());
    }
  }

  getStoredVolume() {
    const storedVolume = localStorage.getItem('tfa-player-volume');
    return parseInt(storedVolume) || 50;
  }
}
