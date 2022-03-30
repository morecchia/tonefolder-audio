import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/core/services/album.service';
import { FocusService } from 'src/app/core/services/focus.service';

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

  @Output()
  sortSelected = new EventEmitter<string>();

  filterForm: FormGroup;
  query: string;
  selectedSort = 'artist';

  get focusChange() { return this.focusService.focusChange$; }
  get sortOptions() { return this.albumService.sorts; }
  get loading() { return this.albumService.loading }

  private _destroy = new Subject();

  constructor(private fb: FormBuilder, private albumService: AlbumService, private focusService: FocusService) {
    this.albumService.albumsScrolled$
      .pipe(
        filter(page => page != null),
        switchMap(page => this.albumService.getAlbums(this.selectedSort, this.query, page)),
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

    this.filterForm.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(f => {
          this.query = f.albumFilter;
          this.albums = [];
          this.albumService.albums = [];
          return this.albumService.getAlbums(this.selectedSort, this.query, this.albumService.currentPage)
        }),
        takeUntil(this._destroy)
      )
      .subscribe(data => {
        this.albums = data;
        this.albumService.albums = this.albums;
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
