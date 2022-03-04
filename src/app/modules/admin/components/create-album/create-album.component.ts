import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Album } from 'src/app/shared/models/album';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {
  createForm: FormGroup;

  @Output()
  albumSubmitted = new EventEmitter<Album>()

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      cover: ['', Validators.required],
    });
  }

  create() {
    if (!this.createForm.valid) {
      return;
    }

    this.albumSubmitted.emit(this.createForm.value)
  }
}
