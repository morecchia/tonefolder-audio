import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Album } from 'src/app/shared/models/album';
import { FileListItem, FileUpload, UploadStatus } from 'src/app/shared/models/track';
import { AlbumService } from 'src/app/core/services/album.service';
import { audioFileTypes, imageFileTypes } from 'src/app/core/services/track.service';
import { FileDropService } from 'src/app/core/services/file-drop.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnDestroy {
  createForm: FormGroup;
  displayedColumns = ['name', 'size', 'status'];
  fileList: FileListItem[] = [];
  albumCover: File;
  uploadStatus = UploadStatus;
  
  @Input()
  coverUploadStatus: string;

  @Input()
  saving: boolean;

  @Input()
  uploads: FileUpload[] = [];

  @Output()
  albumSubmitted = new EventEmitter<{ album: Album, cover: File }>();

  @Output()
  fileAdded = new EventEmitter<File>();

  @Output()
  fileListReset = new EventEmitter<void>();

  get focusChange() { return this.albumService.focusChange$; }
  get acceptedFileTypes() { return [...imageFileTypes, ...audioFileTypes]; }
  get artistControl() { return this.createForm.get('artist'); }
  get titleControl() { return this.createForm.get('title'); }

  private _destroy = new Subject();

  constructor(private fb: FormBuilder, private albumService: AlbumService, private fileDropService: FileDropService) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      cover: [''],
    });

    this.fileDropService.fileDropped
      .pipe(takeUntil(this._destroy))
      .subscribe(file => {
        this.dropped(file);
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  create() {
    if (this.albumCover) {
      this.setCoverPath(this.albumCover.name);
    }

    if (!this.createForm.valid || this.saving) {
      return;
    }

    this.albumSubmitted.emit({
      album: this.createForm.value,
      cover: this.albumCover,
    });
  }

  reset() {
    this.createForm.reset();
    this.albumCover = null;
    this.fileList = [];
    this.fileListReset.emit();
  }

  dropped(file: NgxFileDropEntry) {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((f: File) => {
        if (this.fileDropService.isAccepted(file.relativePath, audioFileTypes)) {
          this.fileList.push({
            name: f.name,
            size: f.size,
            modified: f.lastModified.toLocaleString()
          });
          this.fileAdded.emit(f);
        }
        
        if (this.fileDropService.isAccepted(file.relativePath, imageFileTypes)) {
          this.albumCover = f;
        }
      });
  }

  getUploadStatus(filename: string): string {
    const uploadStatus = this.uploads && this.uploads.find(u => u.name === filename);
    return uploadStatus ? uploadStatus.status : UploadStatus.pending;
  }

  private setCoverPath(filename: string) {
    if (this.artistControl.value && this.titleControl.value) {
      this.createForm.patchValue({
        cover: this.albumService.getCoverPath(filename, this.artistControl.value, this.titleControl.value)
      });
    }
  }
}
