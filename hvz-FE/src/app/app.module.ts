import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from 'src/keycloak';

import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { AdminPage } from './pages/admin/admin.page';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { GameListComponent } from './components/game-list/game-list.component';
import { LandingPage } from './pages/landing/landing.page';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GameCardComponent } from './components/game-card/game-card.component';

import { JwtInterceptor } from './services/jwt-interceptor.service';
import { StompService } from './services/stomp.service';
import { GoogleMapsLoaderService } from './services/google-maps-loader.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    GameListComponent,
    MapComponent,
    NavbarComponent,
    AdminChatComponent,
    LandingPage,
    GameDetailsPage,
    AdminPage,
    GameCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
    GooglePlaceModule,
  ],
  providers: [
    StompService,
    GoogleMapsLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
