import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/shared/services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent {
  @Input()
  albums: Album[];

  @Output()
  albumSelected = new EventEmitter<number>();

  filterForm: FormGroup;
  query: string;

  get currentAlbum() { return this.albumService.currentAlbum; }
  get focusChange() { return this.albumService.focusChange$; }

  private _destroy = new Subject();

  constructor(private fb: FormBuilder, private albumService: AlbumService) {
    this.albumService.albumsScrolled$
      .pipe(
        switchMap(() => this.albumService.getAlbums()),
        takeUntil(this._destroy)
      )
      .subscribe(data => {
        if (this.albums && data && data.length) {
          this.albums.push(...data);
          this.albumService.albums = this.albums;
        }
      });

    this.filterForm = this.fb.group({
      albumFilter: ['']
    });

    this.filterForm.valueChanges.subscribe(f => {
      this.query = f.albumFilter;
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
