import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppConfig } from 'src/config';
import { SelectedFile } from '../../../track/services/track.service';

@Component({
  selector: 'app-player-title',
  templateUrl: './player-title.component.html',
  styleUrls: ['./player-title.component.scss'],
})
export class PlayerTitleComponent {
  @Input()
  selected: SelectedFile;

  @Output()
  albumClicked = new EventEmitter<string>();

  get album() {
    return this.selected && this.selected.album;
  }
  get track() {
    return this.selected && this.selected.title;
  }
  get coverArt() {
    return this.selected && this.selected.cover
      ? `${this.config.serviceUrl}/${this.selected.cover}`
      : `${this.config.serviceUrl}/assets/images/subwoofer-100.png`;
  }

  constructor(private config: AppConfig) {}
}
