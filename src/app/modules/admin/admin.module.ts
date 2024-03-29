import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { CreateAlbumComponent } from './components/create-album/create-album.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AdminContainerComponent,
    CreateAlbumComponent,
    CreatePlaylistComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
