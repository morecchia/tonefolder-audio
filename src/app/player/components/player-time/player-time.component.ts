import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Subscription } from 'rxjs';

export interface StartTime {
  duration: number;
  seconds: number;
}

@Component({
  selector: 'app-player-time',
  templateUrl: './player-time.component.html',
  styleUrls: ['./player-time.component.scss']
})
export class PlayerTimeComponent implements OnInit, OnDestroy {
  playerTimeCtrl = new FormControl();
  playerCtrlSub: Subscription;

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

  constructor() { }

  ngOnInit(): void {
    this.playerCtrlSub = this.playerTimeCtrl.valueChanges
      .subscribe(newValue =>
        this.trackSeek.emit(newValue));
  }

  ngOnDestroy() {
    this.playerCtrlSub.unsubscribe();
  }
}
