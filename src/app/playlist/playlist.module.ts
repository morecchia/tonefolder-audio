import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PlaylistContainerComponent } from './components/playlist-container/playlist-container.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';

@NgModule({
  declarations: [PlaylistContainerComponent, PlaylistItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [PlaylistContainerComponent, PlaylistItemComponent],
})
export class PlaylistModule { }
