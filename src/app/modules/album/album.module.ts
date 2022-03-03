import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { COMPONENTS } from './components';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AlbumRoutingModule } from './album-routing.module';
import { LazyImgDirective } from 'src/app/shared/directives';

@NgModule({
  declarations: [
    ...COMPONENTS,
    LazyImgDirective
  ],
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
