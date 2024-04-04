import { Injectable } from '@angular/core';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private initializedSubject = new BehaviorSubject<boolean>(false);
  isInitialized$ = this.initializedSubject.asObservable();

  isAuthenticated: boolean = false;
  firstName?: string;
  lastName?: string;
  userName?: string;
  keycloakId?: string;
  isUserAdmin: boolean = false;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) {
    this.initializeAuthListener();
  }

  private initializeAuthListener(): void {
    this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationStart =>
            event instanceof NavigationStart
        )
      )
      .subscribe((event: NavigationStart) => {
        try {
          this.isAuthenticated = this.keycloakService.isLoggedIn();

          if (this.isAuthenticated) {
            this.loadUserAttributes();
          }
        } catch (error) {
          console.error('Error occurred during authentication:', error);
        } finally {
          this.initializedSubject.next(true);
        }
      });
  }

  private async loadUserAttributes(): Promise<void> {
    await this.keycloakService.loadUserProfile();

    const tokenParsed = this.keycloakService.getKeycloakInstance()?.tokenParsed;
    if (tokenParsed) {
      this.keycloakId = tokenParsed.sub;
      this.firstName = tokenParsed['given_name'];
      this.lastName = tokenParsed['family_name'];
      this.userName = this.keycloakService.getUsername();
      this.isUserAdmin = this.keycloakService.isUserInRole('Administrator');
    }
  }

  isInitialized(): Observable<boolean> {
    return this.isInitialized$;
  }
}
