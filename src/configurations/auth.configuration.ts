import { environment } from 'src/environments/environment';
import { HttpMethod } from '@auth0/auth0-angular';

export const authConfig = {
    domain: environment.authDomain,
    clientId: environment.authClientId,
    audience: 'https://tonefolder-api',
    httpInterceptor: {
      allowedList: [{
        uri: `${environment.serviceUrl}/api/albums`,
        httpMethod: HttpMethod.Post,
      },
      {
        uri: `${environment.serviceUrl}/api/tracks`,
        httpMethod: HttpMethod.Post,
      },
      {
        uri: `${environment.serviceUrl}/api/uploads`,
        httpMethod: HttpMethod.Post,
      }],
    },
  }