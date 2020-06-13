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

  @HostBinding('class') get HeadingClass() {
    return this.selected ? 'selected' : '';
  }
}
