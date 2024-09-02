import { KeycloakService } from 'keycloak-angular';

/**
 * Initializes Keycloak by configuring the Keycloak service with the provided options.
 * @param keycloakService The Keycloak service instance provided by Keycloak Angular.
 * @returns A function that initializes Keycloak asynchronously.
 */
export const initializeKeycloak = (
  keycloakService: KeycloakService
): (() => Promise<boolean>) => {
  return async () => {
    try {
      const result = await keycloakService.init({
        config: '/assets/keycloak.json',
        initOptions: {
          checkLoginIframe: true,
        },
        loadUserProfileAtStartUp: true,
      });
      console.log('Keycloak initialized successfully');
      return result;
    } catch (error) {
      console.error('Keycloak initialization failed', error);
      return false;
    }
  };
};
