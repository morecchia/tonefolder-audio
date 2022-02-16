import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { COMPONENTS } from './components';
import { PlayerModule } from '../player/player.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PlayerModule,
  ],
  exports: [...COMPONENTS]
})
export class MainPageModule { }
