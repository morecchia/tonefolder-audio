import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Album } from 'src/app/shared/models/album';
import { AlbumService } from 'src/app/shared/services/album.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {
  createForm: FormGroup;

  @Input()
  saving: boolean;
  
  @Output()
  albumSubmitted = new EventEmitter<Album>()

  get focusChange() { return this.albumService.focusChange$; }

  constructor(private fb: FormBuilder, private albumService: AlbumService) {
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
}
