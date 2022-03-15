import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Album } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/shared/services/album.service';
import { TrackService, audioFileTypes, imageFileTypes } from 'src/app/shared/services/track.service';

export interface FileListItem {
  name: string;
  size: number;
  modified: string;
}

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {
  createForm: FormGroup;
  files: NgxFileDropEntry[] = [];
  displayedColumns = ['name', 'size'];
  fileList: Array<FileListItem> = [];
  albumCover: File;

  @Input()
  saving: boolean;

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

  constructor(private fb: FormBuilder, private albumService: AlbumService, private trackService: TrackService) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      cover: ['', Validators.required],
    });
  }

  create() {
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
        this.fileList.push({
          name: file.name,
          size: file.size,
          modified: file.lastModified.toLocaleString()
        });

        if (this.trackService.isAccepted(v.relativePath, audioFileTypes)) {
          this.fileAdded.emit(file);
        }
        
        if (this.trackService.isAccepted(v.relativePath, imageFileTypes)) {
          this.albumCover = file;
          this.createForm.patchValue({cover: this.getCoverPath(file.name)});
        }
      });
    }
  }

  private getCoverPath(filename: string) {
    return `source/${this.artistControl.value} - ${this.titleControl.value}/${filename}`;
  }
}
