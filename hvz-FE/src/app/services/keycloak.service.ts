import { Injectable } from '@angular/core';
import Keycloak, {
  KeycloakInitOptions,
  KeycloakTokenParsed,
} from 'keycloak-js';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: KeycloakInstance;
  private isAuthenticatedSubject: Subject<boolean> = new Subject<boolean>();
  private authSubscription?: Subscription;

  constructor() {
    this.keycloak = new Keycloak('./assets/keycloak.json') as KeycloakInstance;
  }

  initialize(): void {
    const config: KeycloakInitOptions = {
      checkLoginIframe: false,
      onLoad: 'check-sso',
    };
    this.keycloak.init(config).then((authenticated) => {
      this.isAuthenticatedSubject.next(authenticated);
    });
  }

  public subscribeToAuth(callback: (authenticated: boolean) => void): void {
    this.authSubscription = this.isAuthenticated.subscribe(callback);
  }

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
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

  get isUserAdmin(): boolean {
    return this.keycloak.hasResourceRole('Administrator');
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

  public unsubscribeFromAuth(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

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
