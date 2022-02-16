import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { COMPONENTS } from './components';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { TrackRoutingModule } from './track-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CommonModule,
    TrackRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [...COMPONENTS]
})
export class TrackModule { }
