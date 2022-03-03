import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player-time',
  templateUrl: './player-time.component.html',
  styleUrls: ['./player-time.component.scss']
})
export class PlayerTimeComponent implements OnInit, OnDestroy {
  playerTimeCtrl = new FormControl();

  @Input()
  playerTime: number;

  @Input()
  playerTimeFormatted: string;

  @Input()
  duration: number;

  @Input()
  durationFormatted: string;

  @Output()
  trackSeek = new EventEmitter<number>();

  private _destroy = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.playerTimeCtrl.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe(newValue => this.trackSeek.emit(newValue));
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
