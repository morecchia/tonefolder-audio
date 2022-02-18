import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  @Input()
  title: string;

  @Input()
  selected: boolean;

  get coverArt() {
    return this.title
      ? `/source/${this.title}/cover.jpg`
      : '/assets/images/subwoofer-100.png';
  }

  get album() {
    return this.title.split(' - ').reverse();
  }

  @HostBinding('class') get HeadingClass() {
    return this.selected ? 'selected' : '';
  }
}
