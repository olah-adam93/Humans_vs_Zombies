/* Core and common modules */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

/* App routing and keycloak initialization */
import { AppRoutingModule } from './app-routing.module';
import { initializeKeycloak } from 'src/keycloak';

/* Pages */
import { AboutPage } from './pages/about/about.page';
import { AdminPage } from './pages/admin/admin.page';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { LandingPage } from './pages/landing/landing.page';

/* Components */
import { AppComponent } from './app.component';
import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { ChatComponent } from './components/chat/chat.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameDescriptionComponent } from './components/game-description/game-description.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { KillRegistrationComponent } from './components/kill-registration/kill-registration.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlayerChartComponent } from './components/player-chart/player-chart.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';

/* Services */
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { StompService } from './services/stomp.service';
import { GoogleMapsLoaderService } from './services/google-maps-loader.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutPage,
    AdminPage,
    GameDetailsPage,
    LandingPage,
    AdminChatComponent,
    ChatComponent,
    GameCardComponent,
    GameDescriptionComponent,
    GameListComponent,
    KillRegistrationComponent,
    MapComponent,
    NavbarComponent,
    PlayerChartComponent,
    ToastNotificationComponent,
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
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
