import { Injectable } from '@angular/core';
import Keycloak, {
  KeycloakInitOptions,
  KeycloakTokenParsed,
} from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: KeycloakInstance;

  constructor() {
    this.keycloak = new Keycloak('./assets/keycloak.json') as KeycloakInstance;
  }

  initialize(): Promise<boolean> {
    const config: KeycloakInitOptions = {
      checkLoginIframe: false,
      onLoad: 'check-sso',
    };
    return this.keycloak.init(config);
  }

  get isAuthenticated(): boolean {
    return !!this.keycloak.authenticated ?? false;
  }

  get token(): string | undefined {
    return this.keycloak.token;
  }

  get firstName(): string | undefined {
    return this.keycloak.tokenParsed?.given_name;
  }

  get lastName(): string | undefined {
    return this.keycloak.tokenParsed?.family_name;
  }

  get keycloakId(): string | undefined {
    return this.keycloak.tokenParsed?.sub;
  }

  get username(): string | undefined {
    return this.keycloak.tokenParsed?.preferred_username;
  }

  get email(): string | undefined {
    return this.keycloak.tokenParsed?.email;
  }

  get isUserAdmin(): Boolean | undefined {
    return this.keycloak.hasResourceRole('Administrator');
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }
}

// Extended Interfaces to improve IntelliSense for TypeScript.
interface KeycloakInstance extends Keycloak {
  tokenParsed?: KeycloakTokenParsedExtended;
}

interface KeycloakTokenParsedExtended extends KeycloakTokenParsed {
  'allowed-origins': string[];
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  jti?: string;
  name?: string;
  preferred_username?: string;
  roles?: string[];
  scope?: string;
  sid?: string;
  typ?: string;
}
