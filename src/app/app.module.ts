import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AudioContextModule.forRoot('balanced'),
    MainPageModule,
    PlayerModule,
    AlbumModule,
    TrackModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
