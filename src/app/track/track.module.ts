import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [...COMPONENTS]
})
export class TrackModule { }
