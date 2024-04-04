import { KeycloakService } from 'keycloak-angular';

export const initializeKeycloak = (
  keycloakService: KeycloakService
): (() => Promise<boolean>) => {
  return () =>
    keycloakService.init({
      config: '/assets/keycloak.json',
      initOptions: {
        checkLoginIframe: true,
      },
      loadUserProfileAtStartUp: true,
    });
};
