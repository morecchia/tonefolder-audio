import { Component, HostBinding, Input } from '@angular/core';
import { AppConfig } from 'src/config';
import { Album } from 'src/app/_shared/models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  @Input()
  album: Album;

  @Input()
  selected: boolean;

  get coverArt() {
    return `${this.config.serviceUrl}/${this.album.cover}` || `${this.config.serviceUrl}/assets/images/subwoofer-100.png`;
  }

  constructor(private config: AppConfig) { }
}
