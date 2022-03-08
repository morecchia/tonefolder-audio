import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../../shared/material/material.module';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { LoginComponent } from '../login/login.component';
import { PlayerModule } from '../../modules/player/player.module';

@NgModule({
  declarations: [
    MainContainerComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
    MaterialModule,
    PlayerModule,
  ],
  exports: [
    MainContainerComponent,
    LoginComponent,
  ],
})
export class MainLayoutModule { }
