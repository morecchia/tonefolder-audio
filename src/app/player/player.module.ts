import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MaterialModule } from '../material/material.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { COMPONENTS } from './components';
import { PIPES } from './pipes';

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    MaterialModule,
    PlaylistModule,
  ],
  exports: [...COMPONENTS, ...PIPES],
})
export class PlayerModule { }
