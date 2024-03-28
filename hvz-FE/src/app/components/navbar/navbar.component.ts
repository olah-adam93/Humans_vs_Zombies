import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private isLoggedIn = false;
  private username?: string;

  constructor(
    private keycloakService: KeycloakService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToAuthentication(this.handleAuthentication.bind(this));
  }

  ngOnChanges(): void {
    if (this.isLoggedIn && this.username) {
      this.cd.detectChanges();
    }
  }

  private subscribeToAuthentication(
    callback: (authenticated: boolean) => void
  ) {
    this.keycloakService.subscribeToAuth(callback);
  }

  private handleAuthentication(authenticated: boolean): void {
    if (authenticated) {
      this.isLoggedIn = authenticated;
      this.username = this.keycloakService.username;
    }
  }

  handleLogin(): void {
    this.keycloakService.login();
  }

  handleLogout(): void {
    this.keycloakService.logout();
  }
}
