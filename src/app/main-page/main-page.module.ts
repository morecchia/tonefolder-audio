import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { PlayerModule } from '../player/player.module';

@NgModule({
  declarations: [MainContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PlayerModule,
  ],
  exports: [MainContainerComponent],
})
export class MainPageModule { }
