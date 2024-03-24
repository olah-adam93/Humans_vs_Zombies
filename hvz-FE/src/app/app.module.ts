import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { AppRoutingModule } from './app-routing.module';

import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { AdminPage } from './pages/admin/admin.page';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { GameListComponent } from './components/game-list/game-list.component';
import { LandingPage } from './pages/landing/landing.page';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { JwtInterceptor } from './services/jwt-interceptor.service';
import { KeycloakService } from './services/keycloak.service';
import { StompService } from './services/stomp.service';
import { GameCardComponent } from './components/game-card/game-card.component';

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
    HttpClientModule,
    ReactiveFormsModule,
    GooglePlaceModule,
  ],

  providers: [
    StompService,
    KeycloakService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
