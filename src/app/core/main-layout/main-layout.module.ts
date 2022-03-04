import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { PlayerModule } from '../../modules/player/player.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@NgModule({
  declarations: [MainContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationModule,
    MaterialModule,
    PlayerModule,
  ],
  exports: [MainContainerComponent],
})
export class MainLayoutModule { }