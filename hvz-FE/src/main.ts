import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { KeycloakService } from './app/services/keycloak.service';

if (environment.production) {
  enableProdMode();
}

// Initialize KeycloakService for authentication
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    const keycloakService = new KeycloakService();
    keycloakService.initialize().catch((err) => {
      console.error('Error initializing KeycloakService:', err);
    });
  })
  .catch((err) => console.error(err));
