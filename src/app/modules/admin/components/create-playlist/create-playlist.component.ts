import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FocusService } from 'src/app/core/services/focus.service';
import { Playlist } from 'src/app/shared/models/playlist';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent {
  createForm: FormGroup;
  displayedColumns = ['name', 'created_at'];

  @Input()
  playlists: Playlist[];

  @Input()
  saving: boolean;

  @Output()
  playlistSubmitted = new EventEmitter<Playlist>();

  get focusChange() { return this.focusService.focusChange$; }

  constructor(private focusService: FocusService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  create() {
    this.playlistSubmitted.emit(this.createForm.value);
  }

  reset() {
    this.createForm.reset();
  }
}
