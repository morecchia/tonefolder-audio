import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AudioService, StreamState } from './audio.service';
import { TrackService } from './track.service';
import { PlaylistService } from './playlist.service';
import { PlayContext } from 'src/app/shared/models/play-context';
import { PlayerState } from 'src/app/shared/models/player-state';
import { SelectedFile } from 'src/app/shared/models/selected-file';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  selectedFile: SelectedFile;
  currentFile: SelectedFile;
  audioState: StreamState;
  playerState: PlayerState;
  currentVolume: number;
  currentIndex = 0;
  playlist = [];

  constructor(private audioService: AudioService, private trackService: TrackService, private playlistService: PlaylistService) {
    this.initPlayer();
    this.trackService.fileSelected$
      .subscribe(selected => {
        if (selected.context === PlayContext.album) {
          this.playlist = this.trackService.albumTracks;
          localStorage.setItem('tfa-playerState', JSON.stringify({
            currentAlbum: this.trackService.albumTracks,
            playContext: PlayContext.album,
          }));
        } else {
          this.playlist = this.playlistService.playlist;
          localStorage.setItem('tfa-playerState', JSON.stringify({
            currentAlbum: this.trackService.albumTracks,
            playContext: PlayContext.playlist,
          }));
        }
        this.audioService.stop();
        this.selectedFile = selected.file;
        this.currentFile = selected.file;
        this.currentIndex = this.playlist ? this.playlist.findIndex(i => i.title === selected.file.track.name) : 0;
        this.load(selected.file.track.filePath);
        localStorage.setItem('tfa-lastPlayed', JSON.stringify(this.currentFile));
      });

    this.audioService.stateChange$
      .subscribe(state => {
        this.audioState = state;
      });

    this.audioService.end$.subscribe(e => {
      if (e) {
        this.next();
      }
    });

    this.playlistService.playlistUpdated$
      .subscribe(() => {
        this.currentIndex = this.playlist ? this.playlist.findIndex(i =>
          this.currentFile && i.title === this.currentFile.track.name) : 0;
      });
  }

  load(track: string) {
    if (this.currentVolume > 0) {
      this.setVolume(this.getStoredVolume(), false);
    }

    this.audioService
      .playStream(`${environment.serviceUrl}/${track}`)
      .subscribe();
  }

  play() {
    if (this.audioState && this.audioState.currentTime) {
      this.audioService.play();
    } else {
      this.load(this.selectedFile.track.filePath);
    }
  }

  pause() {
    this.audioService.pause();
  }

  stop() {
    this.audioService.stop();
  }

  openFile(file: SelectedFile) {
    this.audioService.stop();
    if (file) {
      this.currentFile = file;
      this.selectedFile = file;
      this.load(this.currentFile.track.filePath);
    }
  }

  next() {
    if (!this.playlist || !this.playlist.length || (this.currentIndex === this.playlist.length - 1)) {
      return;
    }

    this.currentIndex = this.currentIndex + 1;
    const file = this.playlist[this.currentIndex];
    this.openFile(file);
  }

  previous() {
    if (this.currentIndex <= 0) {
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

  private initPlayer() {
    this.currentVolume = this.getStoredVolume();
    this.selectedFile = JSON.parse(localStorage.getItem('tfa-lastPlayed'));
    this.currentFile = this.selectedFile;
    this.playerState = JSON.parse(localStorage.getItem('tfa-playerState'));
    if (!this.playerState) {
      return;
    }
    if (this.playerState.playContext === PlayContext.album) {
      this.playlist = this.playerState.currentAlbum;
    } else {
      this.playlist = this.playlistService.playlist;
    }
    this.currentIndex = this.playlist ? this.playlist.findIndex(i => i.title === this.selectedFile.track.name) : 0;
  }
}
