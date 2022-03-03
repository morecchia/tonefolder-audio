import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectedFile } from 'src/app/shared/services/track.service';

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
      ? `${environment.serviceUrl}/${this.selected.cover}`
      : `${environment.serviceUrl}/assets/images/subwoofer-100.png`;
  }
}
