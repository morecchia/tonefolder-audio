import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { PlayerModule } from 'src/app/modules/player/player.module';

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
    PipesModule,
    PlayerModule,
  ],
  exports: [
    MainContainerComponent,
    LoginComponent,
  ],
})
export class LayoutModule { }
