import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Album } from 'src/app/shared/models/album';
import { FileListItem } from 'src/app/shared/models/track';
import { AlbumService } from 'src/app/shared/services/album.service';
import { TrackService, audioFileTypes, imageFileTypes } from 'src/app/shared/services/track.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnDestroy {
  createForm: FormGroup;
  files: NgxFileDropEntry[] = [];
  displayedColumns = ['name', 'size', 'status'];
  fileList: FileListItem[] = [];
  albumCover: File;

  @Input()
  saving: boolean;

  @Input()
  uploads: any[] = [];

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

  constructor(private fb: FormBuilder, private albumService: AlbumService, private trackService: TrackService) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      cover: [''],
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  create() {
    this.setCoverPath(this.albumCover.name);

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
    this.files = [];
    this.fileList = [];
    this.fileListReset.emit();
  }

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.fileList = [];
    for (const v of files) {
      if (!v.fileEntry.isFile || !this.trackService.isAccepted(v.relativePath, this.acceptedFileTypes)) {
        continue;
      }

      const fileEntry = v.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        if (this.trackService.isAccepted(v.relativePath, audioFileTypes)) {
          this.fileList.push({
            name: file.name,
            size: file.size,
            modified: file.lastModified.toLocaleString()
          });
          this.fileAdded.emit(file);
        }
        
        if (this.trackService.isAccepted(v.relativePath, imageFileTypes)) {
          this.albumCover = file;
        }
      });
    }
  }

  getUploadStatus(filename: string): string {
    const uploadStatus = this.uploads && this.uploads.find(u => u.name === filename);
    return uploadStatus ? uploadStatus.status : 'Pending';
  }

  private setCoverPath(filename: string) {
    if (this.artistControl.value && this.titleControl.value) {
      this.createForm.patchValue({cover: `source/${this.artistControl.value} - ${this.titleControl.value}/${filename}`});
    }
  }
}
