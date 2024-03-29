import { Component, HostListener, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn = false;
  public username?: string;
  public navbarSticky = false;
  public navbarOpacity = 1;
  public authSubscription: any;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.authSubscription = this.keycloakService.subscribeToAuth(
      this.handleAuthentication.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollY = window.scrollY || window.pageYOffset;
    this.navbarSticky = scrollY > 0;

    if (scrollTop > 100) {
      this.navbarOpacity = 0.5;
    } else {
      this.navbarOpacity = 1;
    }
  }
}
