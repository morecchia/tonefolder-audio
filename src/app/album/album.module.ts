import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { COMPONENTS } from './components';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [...COMPONENTS, PipesModule]
})
export class AlbumModule { }
