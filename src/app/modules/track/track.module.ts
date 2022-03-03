import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TrackRoutingModule } from './track-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CommonModule,
    TrackRoutingModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [...COMPONENTS]
})
export class TrackModule { }
