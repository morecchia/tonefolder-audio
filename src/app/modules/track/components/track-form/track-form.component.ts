import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss']
})
export class TrackFormComponent implements OnInit {
  form: FormGroup;

  @Input()
  track: Track;

  constructor(private fb: FormBuilder, private modal: ModalService) {
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.patchValue({
      id: this.track.id,
      name: this.track.name
    });
  }

  save() {
    if (this.form.valid) {
      this.modal.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.modal.dialogRef.close();
  }
}
