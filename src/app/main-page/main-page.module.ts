import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { COMPONENTS } from './components';
import { MainPageRoutingModule } from './main-page-routing.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { PlayerModule } from '../player/player.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MaterialModule,
    AlbumModule,
    TrackModule,
    PlayerModule,
  ],
  exports: [RouterModule, ...COMPONENTS]
})
export class MainPageModule { }
