import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      domain: 'dev-4g4kgxu3.us.auth0.com',
      clientId: 'Yc7f7Bm2Jo97S0UNAgpgSC7hKhVAXR3G'
    }),
  ],
  exports: [LoginComponent],
})
export class AuthenticationModule { }
