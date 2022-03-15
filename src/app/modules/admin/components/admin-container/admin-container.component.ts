import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, concat } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/shared/services/album.service';
import { TrackService } from 'src/app/shared/services/track.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnDestroy {
  saving = false;
  albumFiles: File[] = [];
  albumId: number;
  completedUploads: string[];

  private _destroy = new Subject();

  constructor(private router: Router, private albumService: AlbumService, private trackService: TrackService) { }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  addFile(file: File) {
    this.albumFiles.push(file);
  }

  clearFileList() {
    this.albumFiles = [];
  }

  submitAlbum(value: {album: Album, cover: File}) {
    this.saving = true;
    this.albumService.createAlbum(value.album, value.cover)
      .pipe(
        takeUntil(this._destroy),
        switchMap(a => {
          this.albumId = a.id;
          return concat(...this.trackService.saveTracks(this.albumFiles, a))
        }),
        finalize(() => {
          this.saving = false;
          this.router.navigate(['/tracks', this.albumId]);
        })
      )
      .subscribe();
  }
}
