import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AudioContextModule } from 'angular-audio-context';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { MainPageModule } from './main-page/main-page.module';
import { PlayerModule } from './player/player.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AudioContextModule.forRoot('balanced'),
    MainPageModule,
    PlayerModule,
    AlbumModule,
    TrackModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
