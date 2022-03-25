import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, } from "@angular/material/dialog";
import { concat, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SelectedFile, TrackService, audioFileTypes, imageFileTypes } from 'src/app/core/services/track.service';
import { StreamState } from 'src/app/core/services/audio.service';
import { Album } from 'src/app/shared/models/album';
import { Track, FileListItem, UploadStatus } from 'src/app/shared/models/track';
import { ModalService } from 'src/app/core/services/modal.service';
import { FileDropperComponent } from 'src/app/shared/components/file-dropper/file-dropper.component'
import { FileDropService } from 'src/app/core/services/file-drop.service';
import { AlbumService } from 'src/app/core/services/album.service';
import { TrackFormComponent } from '../track-form/track-form.component';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnDestroy {
  @Input()
  loggedIn: boolean;

  @Input()
  playerState: StreamState;

  @Input()
  selectedAlbum: Album;

  @Input()
  currentTrack: string;

  @Input()
  tracksResponse: Album;

  @Output()
  trackSelected = new EventEmitter<Track>();

  @Output()
  trackToggled = new EventEmitter<void>();

  @Output()
  trackQueued = new EventEmitter<SelectedFile>();

  @Output()
  deleteConfirmed = new EventEmitter<Track>()

  playingIndex: number;
  modalRef: MatDialogRef<FileDropperComponent>;
  tempCoverArt: string | ArrayBuffer;
  coverFile: File;
  fileList: FileListItem[] = [];
  uploading: boolean;

  get coverArt() {
    return this.tracksResponse && this.tracksResponse.cover
      ? `${environment.serviceUrl}/${this.tracksResponse.cover}`
      : `${environment.serviceUrl}/assets/images/subwoofer-100.png`;
  }
  set coverArt(url) { this.coverArt = url };
  get tracks() {
    return this.tracksResponse.tracks
      .sort((a: Track, b: Track) => a.order - b.order);
  }

  get trackCount() { return this.tracksResponse?.tracks.length; }
  get album() { return this.tracksResponse && this.tracksResponse.title; }
  get artist() { return this.tracksResponse && this.tracksResponse.artist; }
  get loading() { return this.trackService.loading; }

  private _destroy = new Subject();

  constructor(
    private trackService: TrackService,
    private modal: ModalService,
    private fileDropService: FileDropService,
    private albumService: AlbumService
  ) {
    this.fileDropService.fileDropped
      .pipe(takeUntil(this._destroy))
      .subscribe(file => {
        if (!file) {
          return;
        }
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        if (this.fileDropService.isAccepted(file.relativePath, audioFileTypes)) {
          fileEntry.file(audio => {
            this.fileList.push({
              file: audio,
              name: audio.name,
              size: audio.size,
              modified: audio.lastModified.toLocaleString(),
              status: UploadStatus.pending,
            });
          });
        }

        if (this.fileDropService.isAccepted(file.relativePath, imageFileTypes)) {
          this.uploadImage(fileEntry)
        }
        this.modal.dialogRef && this.modal.dialogRef.close();
      });
  }

  ngOnDestroy(): void {
    this.fileDropService.fileDropped.next(null);
    this._destroy.next();
    this._destroy.complete();
  }

  selectTrack(track: Track) {
    if (this.currentTrack === track.name) {
      this.trackToggled.emit();
    } else {
      this.trackSelected.emit(track);
    }
  }

  queueTrack(track: Track) {
    this.trackQueued.emit({
      albumId: this.selectedAlbum.id,
      album: this.selectedAlbum.title,
      title: track.name,
      file: track.filePath,
      cover: this.tracksResponse.cover,
    });
  }

  getDownloadLink(track: string) {
    return `/source/${this.selectedAlbum.title}/${track}`;
  }

  openEditModal() {
    this.tempCoverArt = null;
    this.modal.open(FileDropperComponent, {
      data: {
        message: 'Drop a folder or file containing the album\'s cover art',
        acceptedFileTypes: imageFileTypes,
        multiple: false,
      },
      width: '600px',
    });
  }

  addTrackModal() {
    this.modal.open(FileDropperComponent, {
      data: {
        message: 'Drop a folder or file containing the track media',
        acceptedFileTypes: audioFileTypes,
        multiple: true,
      },
      width: '600px',
    });
  }

  openTrackModal(track: Track) {
    this.tempCoverArt = null;
    this.modal.open(TrackFormComponent, {
      data: {
        track: track,
      },
      width: '600px',
    });

    this.modal.closed()
      .pipe(
        switchMap(track => {
          const idx = this.tracksResponse.tracks.findIndex(t => t.id === track.id);
          const newTrack = Object.assign({}, this.tracksResponse.tracks[idx], {
            name: track.name,
          });
          this.tracksResponse.tracks.splice(idx, 1, newTrack);
          return this.trackService.updateTrack(track);
        }),
        takeUntil(this._destroy)
      )
      .subscribe();
  }

  saveAlbum() {
    const { artist, title } = this.tracksResponse
    this.tracksResponse.cover = this.albumService.getCoverPath(this.coverFile.name, artist, title);
    this.trackService.loading = true;
    this.albumService.updateAlbum(this.tracksResponse, this.coverFile)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.trackService.loading = false;
      });
  }

  uploadTracks() {
    this.uploading = true;
    const tracksToAdd = [];
    concat(...this.trackService.saveTracks(this.fileList.map(f => f.file), this.tracksResponse))
      .pipe(takeUntil(this._destroy))
      .subscribe(res => {
        if (res.hasOwnProperty('album_id')) {
          tracksToAdd.push(res);
        }
        if (res.hasOwnProperty('inProgress')) {
          this.setUploadStatus(res.inProgress, UploadStatus.inProgress);
        }
        if (typeof res === 'string') {
          const trackName = res.split('/').pop();
          this.setUploadStatus(trackName, UploadStatus.done);
        }
        if (this.fileList.every(f => f.status === UploadStatus.done)) {
          this.uploading = false;
          this.fileList = [];
          this.tracksResponse.tracks.push(...tracksToAdd);
        }
      });
  }

  deleteTrack(track: Track) {
    this.modal.open(ConfirmComponent, {
      data: {
        message: `Are you sure you want to delete '${track.name}'?`,
      }
    });

    this.modal.closed()
      .pipe(takeUntil(this._destroy))
      .subscribe(confirmed => {
        if (confirmed) {
          const idx = this.tracksResponse.tracks.findIndex(t => t.id === track.id);
          this.tracksResponse.tracks.splice(idx, 1);
          this.deleteConfirmed.emit(track);
        }
      })
  }

  private setUploadStatus(trackName: string, status: string) {
    const idx = this.fileList.findIndex(u => u.name === trackName);
    this.fileList.splice(idx, 1, Object.assign({}, this.fileList[idx], {status}));
  }

  private uploadImage(fileEntry: FileSystemFileEntry) {
    const reader = new FileReader();
    fileEntry.file(img => {
      reader.readAsDataURL(img);
      reader.onload = () => {
        this.tempCoverArt = reader.result;
        this.coverFile = img;
      };
    });
  }
}
