import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(private keycloak: KeycloakService) {}

  ngOnInit(): void {}

  get username(): string | undefined {
    return this.keycloak.username;
  }

  get isLoggedIn(): boolean | undefined {
    return this.keycloak.isAuthenticated;
  }
}
