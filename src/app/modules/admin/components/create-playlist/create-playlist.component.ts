import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FocusService } from 'src/app/core/services/focus.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  createForm: FormGroup;
  saving: boolean;

  get focusChange() { return this.focusService.focusChange$; }

  constructor(private focusService: FocusService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  create() {
    
  }

  reset() {
    this.createForm.reset();
  }

}
