import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, concat } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/shared/models/album';
import { FileUpload, UploadStatus } from 'src/app/shared/models/track';
import { AlbumService } from 'src/app/core/services/album.service';
import { TrackService } from 'src/app/core/services/track.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnDestroy {
  saving = false;
  albumId: number;
  albumFiles: File[] = [];
  uploads: FileUpload[] = [];
  coverStatus = UploadStatus.pending;

  private _destroy = new Subject();

  constructor(private router: Router, private albumService: AlbumService, private trackService: TrackService) { }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  addFile(file: File) {
    this.albumFiles.push(file);
    this.uploads.push({name: file.name, status: UploadStatus.pending})
  }

  clearFileList() {
    this.albumFiles = [];
  }

  submitAlbum(value: {album: Album, cover: File}) {
    this.saving = true;
    this.coverStatus = UploadStatus.inProgress;
    this.albumService.createAlbum(value.album, value.cover)
      .pipe(
        takeUntil(this._destroy),
        switchMap(a => {
          this.coverStatus = 'done';
          this.albumId = a.id;
          return concat(...this.trackService.saveTracks(this.albumFiles, a))
        }),
        finalize(() => {
          this.saving = false;
          this.router.navigate(['/tracks', this.albumId]);
        })
      )
      .subscribe((res: any) => {
        if (res.hasOwnProperty('inProgress')) {
          this.setUploadStatus(res.inProgress, UploadStatus.inProgress);
        }

        if (typeof res === 'string') {
          const trackName = res.split('/').pop();
          this.setUploadStatus(trackName, UploadStatus.done);
        }
      });
  }

  private setUploadStatus(trackName: string, status: string) {
    const idx = this.uploads.findIndex(u => u.name === trackName);
    this.uploads.splice(idx, 1, { name: trackName, status: status });
  }
}
