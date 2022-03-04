import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  saving = false;

  private _destroy = new Subject();

  constructor(private router: Router, private albumService: AlbumService) { }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  submitAlbum(album: Album) {
    this.saving = true;
    this.albumService.createAlbum(album)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.saving = false;
        this.router.navigate(['/albums']);
      });
  }
}
