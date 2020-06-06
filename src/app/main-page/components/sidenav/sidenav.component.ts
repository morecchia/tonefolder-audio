import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlbumService } from '../../../album/services/album.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  title = 'tonefolder-audio';

  filterForm: FormGroup;

  @Input()
  selectedAlbum: any;

  get trackCount() { return this.selectedAlbum?.trackCount; }
  get coverArt() {
    return this.selectedAlbum && this.selectedAlbum.cover
      ? `/source/${this.selectedAlbum.title}/${this.selectedAlbum.cover}`
      : '/assets/images/subwoofer-100.png';
  }
  
  constructor(private fb: FormBuilder, private albumService: AlbumService) {
    this.filterForm = this.fb.group({
      albumFilter: ['']
    });

    this.filterForm.valueChanges.subscribe(f => {
      this.albumService.filterAlbums(f.albumFilter);
    });
  }
}
