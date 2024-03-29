import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectedFile } from 'src/app/shared/models/selected-file';

@Component({
  selector: 'app-player-title',
  templateUrl: './player-title.component.html',
  styleUrls: ['./player-title.component.scss'],
})
export class PlayerTitleComponent {
  @Input()
  selected: SelectedFile;

  @Output()
  albumClicked = new EventEmitter<SelectedFile>();

  get album() {
    return this.selected && this.selected.albumTitle;
  }
  get track() {
    return this.selected && this.selected.track.name;
  }
  get coverArt() {
    return this.selected && this.selected.cover
      ? `${environment.serviceUrl}/${this.selected.cover}`
      : `${environment.serviceUrl}/assets/images/subwoofer-100.png`;
  }
}
