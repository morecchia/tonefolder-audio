import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  title = 'tonefolder-audio';

  @Input()
  selectedAlbum: any;

  get trackCount() { return this.selectedAlbum?.trackCount; }
  get coverArt() {
    return this.selectedAlbum && this.selectedAlbum.cover
      ? `/source/${this.selectedAlbum.title}/${this.selectedAlbum.cover}`
      : '/assets/images/subwoofer-100.png';
  }
}
