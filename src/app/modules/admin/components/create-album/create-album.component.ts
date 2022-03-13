import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Album } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/shared/services/album.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {
  createForm: FormGroup;
  files: NgxFileDropEntry[] = [];
  displayedColumns = ['name', 'size'];
  acceptedFileTypes = ['.mp3', '.wav', '.jpg', '.png'];
  data: Array<any> = [];

  @Input()
  saving: boolean;
  
  @Output()
  albumSubmitted = new EventEmitter<Album>()

  get focusChange() { return this.albumService.focusChange$; }

  constructor(private fb: FormBuilder, private albumService: AlbumService, private ref: ChangeDetectorRef) {
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
    this.albumSubmitted.emit(this.createForm.value)
  }

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.data = [];
    for (const [i, v] of files.entries()) {
      // Is it a file?
      if (v.fileEntry.isFile) {
        const fileEntry = v.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.data.push({
            name: this.files[i].relativePath,
            size: file.size,
            modified: file.lastModified.toLocaleString()
          });
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      }
    }
  }

  fileOver(event){
    //console.log(event);
  }

  fileLeave(event){
    //console.log(event);
  }
}
