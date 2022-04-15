import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PlaylistContainerComponent } from './components/playlist-container/playlist-container.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';
import { PlaylistContentComponent } from './components/playlist-content/playlist-content.component';

@NgModule({
  declarations: [PlaylistContainerComponent, PlaylistItemComponent, PlaylistContentComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [PlaylistContainerComponent, PlaylistItemComponent],
})
export class PlaylistModule { }
