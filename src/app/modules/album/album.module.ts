import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { COMPONENTS } from './components';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
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
    SharedModule,
    AlbumRoutingModule,
  ],
  exports: [
    RouterModule,
    ...COMPONENTS,
  ]
})
export class AlbumModule { }
