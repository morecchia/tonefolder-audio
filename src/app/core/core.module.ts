import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayerModule } from 'src/app/modules/player/player.module';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    MainContainerComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
    NgxFileDropModule,
    MaterialModule,
    SharedModule,
    PlayerModule,
  ],
  exports: [
    MainContainerComponent,
    LoginComponent,
  ],
})
export class CoreModule { }
