import { KeycloakService } from 'keycloak-angular';

/**
 * Initializes Keycloak by configuring the Keycloak service with the provided options.
 * @param keycloakService The Keycloak service instance provided by Keycloak Angular.
 * @returns A function that initializes Keycloak asynchronously.
 */
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
