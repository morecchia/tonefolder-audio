import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Album } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/shared/services/album.service';
import { TrackService, audioFileTypes, imageFileTypes } from 'src/app/shared/services/track.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {
  createForm: FormGroup;
  files: NgxFileDropEntry[] = [];
  displayedColumns = ['name', 'size'];
  data: Array<any> = [];

  @Input()
  saving: boolean;

  @Output()
  albumSubmitted = new EventEmitter<Album>();

  @Output()
  fileAdded = new EventEmitter<File>();

  get focusChange() { return this.albumService.focusChange$; }
  get acceptedFileTypes() { return [...imageFileTypes, ...audioFileTypes]; }


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
    this.albumSubmitted.emit(this.createForm.value);
  }

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.data = [];
    for (const v of files) {
      if (!v.fileEntry.isFile || !this.trackService.isAccepted(v.relativePath, this.acceptedFileTypes)) {
        continue;
      }

      const fileEntry = v.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.data.push({
          name: v.relativePath,
          size: file.size,
          modified: file.lastModified.toLocaleString()
        });

        this.fileAdded.emit(file);
        
        if (this.trackService.isAccepted(v.relativePath, imageFileTypes)) {
          this.createForm.patchValue({cover: `source/${v.relativePath}`});
        }
      });
    }
  }
}
