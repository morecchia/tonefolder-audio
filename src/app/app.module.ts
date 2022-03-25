import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortalModule}  from '@angular/cdk/portal';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { authConfig } from '../configurations/auth.configuration';
import { MaterialModule } from './shared/material/material.module';
import { LayoutModule } from './core/layout/layout.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DialogContainerComponent } from './core/components/dialog-container/dialog-container.component';
import { ConfirmComponent } from './core/components/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogContainerComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(authConfig),
    PortalModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
