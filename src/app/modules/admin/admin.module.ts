import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FileDropModule  } from 'src/app/core/file-drop/file-drop.module';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { CreateAlbumComponent } from './components/create-album/create-album.component';
import { AdminRoutingModule } from './admin-routing.module';

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
    MaterialModule,
    PipesModule,
    FileDropModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
