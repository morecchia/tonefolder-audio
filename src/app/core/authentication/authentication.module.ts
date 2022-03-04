import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { environment } from "src/environments/environment";
import { LoginComponent } from "./components/login/login.component";
import { AuthModule } from "@auth0/auth0-angular";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      domain: environment.authDomain,
      clientId: environment.authClientId,
      httpInterceptor: {
        allowedList: [
          // Matching on HTTP methods
          {
            uri: "/api/albums",
            httpMethod: "post",
            tokenOptions: {
              audience: 'https://tonefolder-api',
              scope: 'write:albums',
            },
          },
        ],
      },
    }),
  ],
  exports: [LoginComponent],
})
export class AuthenticationModule {}