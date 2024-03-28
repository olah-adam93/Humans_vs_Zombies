import { Component } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  public isAuthenticated?: boolean;
  public isUserAdmin?: boolean;
  public keycloakId?: string;
  public username?: string;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.subscribeToAuthentication(this.handleAuthentication.bind(this));
  }

  private subscribeToAuthentication(
    callback: (authenticated: boolean) => void
  ) {
    this.keycloakService.subscribeToAuth(callback);
  }

  private handleAuthentication(authenticated: boolean): void {
    if (authenticated) {
      this.isAuthenticated = authenticated;
      this.isUserAdmin = this.keycloakService.isUserAdmin;
      this.keycloakId = this.keycloakService.keycloakId;
      this.username = this.keycloakService.username;
    }
  }
}
