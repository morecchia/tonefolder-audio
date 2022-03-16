import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Album } from 'src/app/shared/models/album';

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
    return this.album.cover
      ? `${environment.serviceUrl}/${this.album.cover}`
      : `${environment.serviceUrl}/assets/images/subwoofer-100.png`;
  }
}
