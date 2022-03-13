import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateAlbumComponent } from './components/create-album/create-album.component';

@NgModule({
  declarations: [
    AdminContainerComponent,
    CreateAlbumComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    MaterialModule,
    PipesModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
