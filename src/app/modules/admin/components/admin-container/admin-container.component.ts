import { Component, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/shared/services/album.service';
import { Album } from 'src/app/shared/models/album';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnDestroy {
  constructor(private albumService: AlbumService) { }

  private _destroy = new Subject();

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  submitAlbum(album: Album) {
    this.albumService.createAlbum(album)
      .pipe(takeUntil(this._destroy))
      .subscribe();
  }
}
