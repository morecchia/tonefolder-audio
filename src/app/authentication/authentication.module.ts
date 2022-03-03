import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      domain: environment.authDomain,
      clientId: environment.authClientId,
    }),
  ],
  exports: [LoginComponent],
})
export class AuthenticationModule { }
