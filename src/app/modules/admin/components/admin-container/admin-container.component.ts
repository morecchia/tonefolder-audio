import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, concat, Observable } from 'rxjs';
import { finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { Album } from 'src/app/shared/models/album';
import { FileListItem, UploadStatus } from 'src/app/shared/models/track';
import { AlbumService } from 'src/app/core/services/album.service';
import { TrackService } from 'src/app/core/services/track.service';
import { Playlist } from 'src/app/shared/models/playlist';
import { PlaylistService } from 'src/app/core/services/playlist.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnDestroy {
  saving = false;
  albumId: number;
  uploads: FileListItem[] = [];
  coverStatus = UploadStatus.pending;
  playlists: Observable<Playlist[]>;

  private _destroy = new Subject();

  constructor(
    private router: Router,
    private albumService: AlbumService,
    private trackService: TrackService,
    private playlistService: PlaylistService,
  ) {
    this.playlists = this.playlistService.getPlaylists();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  addFile(item: FileListItem) {
    this.uploads.push(item)
  }

  clearFileList() {
    this.uploads = [];
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
          return concat(...this.trackService.saveTracks(this.uploads.map(u => u.file), a))
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

  submitPlaylist(data: {playlist: Playlist, collection: Playlist[]}) {
    this.saving = true;
    this.playlists = this.playlistService.createPlaylist(data.playlist)
      .pipe(
        takeUntil(this._destroy),
        map((res: Playlist) => [...data.collection, res]),
        finalize(() => this.saving = false)
      );
  }

  private setUploadStatus(trackName: string, status: string) {
    const idx = this.uploads.findIndex(u => u.name === trackName);
    this.uploads.splice(idx, 1, Object.assign({}, this.uploads[idx], {status}));
  }
}
