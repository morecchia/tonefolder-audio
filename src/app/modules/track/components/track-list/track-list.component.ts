import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, } from "@angular/material/dialog";
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { SelectedFile, TrackService, imageFileTypes } from 'src/app/core/services/track.service';
import { StreamState } from 'src/app/core/services/audio.service';
import { Album } from 'src/app/shared/models/album';
import { Track } from 'src/app/shared/models/track';
import { ModalService } from 'src/app/core/services/modal.service';
import { FileDropperComponent } from 'src/app/core/file-drop/components/file-dropper/file-dropper.component'
import { FileDropService } from 'src/app/core/services/file-drop.service';
import { AlbumService } from 'src/app/core/services/album.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnDestroy {
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

  playingIndex: number;
  modalRef: MatDialogRef<FileDropperComponent>;
  tempCoverArt: string | ArrayBuffer;
  coverFile: File;

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
  get loggedIn$() { return this.auth.isAuthenticated$; }
  get trackCount() { return this.tracksResponse?.tracks.length; }
  get album() { return this.tracksResponse && this.tracksResponse.title; }
  get artist() { return this.tracksResponse && this.tracksResponse.artist; }
  get loading() { return this.trackService.loading; }

  private _destroy = new Subject();

  constructor(
    private auth: AuthService,
    private trackService: TrackService,
    private modal: ModalService,
    private fileDropService: FileDropService,
    private albumService: AlbumService
  ) {
    this.fileDropService.fileDropped
      .pipe(takeUntil(this._destroy))
      .subscribe(file => {
        if (file) {
          this.modal.dialogRef && this.modal.dialogRef.close();
          const fileEntry = file.fileEntry as FileSystemFileEntry;
          const reader = new FileReader();

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.tempCoverArt = reader.result;
              this.coverFile = file;
            };
          });
        }
      });
  }

  ngOnDestroy(): void {
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
}
