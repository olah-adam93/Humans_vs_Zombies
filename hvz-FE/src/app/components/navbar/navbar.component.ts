import { Component } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private keycloakService: KeycloakService) {}

  get isLoggedIn(): boolean {
    return this.keycloakService.isAuthenticated;
  }

  get username(): string | undefined {
    return this.keycloakService.username;
  }

  handleLogin(): void {
    this.keycloakService.login();
  }

  handleLogout(): void {
    this.keycloakService.logout();
  }
}
