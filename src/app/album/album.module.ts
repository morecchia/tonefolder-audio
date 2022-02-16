import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { COMPONENTS } from './components';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { AlbumRoutingModule } from './album-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PipesModule,
    AlbumRoutingModule,
  ],
  exports: [
    RouterModule,
    ...COMPONENTS,
    PipesModule
  ]
})
export class AlbumModule { }
