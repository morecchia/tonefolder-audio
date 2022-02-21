import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { COMPONENTS } from './components';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PlaylistModule,
  ],
  exports: [...COMPONENTS],
})
export class PlayerModule { }
