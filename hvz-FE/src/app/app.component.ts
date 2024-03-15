import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './services/keycloak.service';
import { StompService } from './services/stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private keycloakService: KeycloakService,
    private stompService: StompService
  ) {}

  ngOnInit(): void {
    this.stompService.connectToServer();
  }

  get isLoggedIn(): boolean {
    return this.keycloakService.isAuthenticated;
  }

  get token(): string | undefined {
    return this.keycloakService.token;
  }

  get username(): string | undefined {
    return this.keycloakService.username;
  }

  get email(): string | undefined {
    return this.keycloakService.email;
  }

  handleLogin(): void {
    this.keycloakService.login();
  }

  handleLogout(): void {
    this.keycloakService.logout();
  }
}
