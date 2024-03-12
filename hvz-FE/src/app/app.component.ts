import { Component, OnInit } from '@angular/core';
import keycloak from '../keycloak';
import { StompService } from './services/stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hvz_sajat_angular';

  constructor(private stompService: StompService) {}
  ngOnInit(): void {
    this.stompService.connectToServer();
  }

  get isLoggedIn(): Boolean | undefined {
    return keycloak.authenticated;
  }

  get token(): string | undefined {
    return keycloak.token;
  }

  get name(): string | undefined {
    return keycloak.tokenParsed?.name; //ha encoded info-t akarunk belőle, tokenParsed
  }

  get email(): string | undefined {
    return keycloak.tokenParsed?.email;
  }

  handleLogin(): void {
    keycloak.login();
    // console.log(keycloak.token)
  }

  handleLogout(): void {
    keycloak.logout();
  }
}
