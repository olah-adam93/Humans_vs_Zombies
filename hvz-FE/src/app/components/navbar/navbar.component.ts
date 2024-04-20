import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

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

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.keycloakService?.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.keycloakService?.getUsername();
    }
  }

  handleLogin(): void {
    this.keycloakService.login();
  }

  handleLogout(): void {
    this.keycloakService.logout();
  }

  navigateToHome(): void {
    this.router.navigateByUrl('');
  }

  navigateToAbout(): void {
    this.router.navigateByUrl('/about');
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
