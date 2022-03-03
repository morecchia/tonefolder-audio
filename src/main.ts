import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfig } from './config';

let serviceUrl = 'http://localhost:8000';

if (environment.production) {
  serviceUrl = '';
  enableProdMode();
}

const configObj = { serviceUrl };

platformBrowserDynamic([{ provide: AppConfig, useValue: configObj }])
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
