import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initialize } from './keycloak';

if (environment.production) {
  enableProdMode();
}

//initialize Keycloak-ból, autentikációhoz kell
initialize().then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
