import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { COMPONENTS } from './components';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { PlayerModule } from '../player/player.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    AlbumModule,
    TrackModule,
    PlayerModule,
  ],
  exports: [...COMPONENTS]
})
export class MainPageModule { }
