import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { KeycloakService } from './app/services/keycloak.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((moduleRef) => {
    const keycloakService = moduleRef.injector.get(KeycloakService); // Inject KeycloakService
    return keycloakService.initialize(); // Initialize KeycloakService
  })
  .catch((err) => console.error('Error bootstrapping application:', err));
