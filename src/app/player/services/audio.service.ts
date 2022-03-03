import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

export interface StreamState {
  playing: boolean;
  loading: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number | undefined;
  currentTime: number | undefined;
  canplay: boolean;
  error: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  constructor() {
    dayjs.extend(utc);
  }

  error$ = new BehaviorSubject<Event>(null);
  end$ = new BehaviorSubject<Event>(null);

  private stop$ = new Subject();
  private audioObj = new Audio();

  audioEvents = [
    'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
  ];

  private state: StreamState = {
    playing: false,
    loading: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private streamObservable(url: string) {
    return new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        this.resetState();
      };
    });
  }

  private addEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(
      takeUntil(this.stop$),
      catchError(err => { console.log(err); return err; })
    );
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(seconds: number, format: string = 'HH:mm:ss') {
    const time = seconds * 1000;
    return dayjs.utc(time).format(format);
  }

  setVolume(volume: number) {
    this.audioObj.volume = volume;
  }

  private updateStateEvents(event: Event): void {
    console.log('updateStateEvents', event.type);

    switch (event.type) {
      case 'loadstart':
        this.state.loading = true;
        break;
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        this.state.loading = false;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'ended':
        this.end$.next(event);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        this.error$.next(event);
        break;
    }

    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      loading: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }
}
