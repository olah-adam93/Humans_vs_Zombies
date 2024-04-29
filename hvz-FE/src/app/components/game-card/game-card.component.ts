import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { KeycloakService } from 'keycloak-angular';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() public game!: Game;
  @Output() deleteGameEvent = new EventEmitter<Game>();

  public isLoggedIn?: boolean;
  public isUserAdmin?: boolean;
  public imgUrl?: string;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.keycloakService?.isLoggedIn();
    this.isUserAdmin = this.keycloakService.isUserInRole('Administrator');
    if (this.game.location) {
      this.fetchCityPhotoByName(this.game.location);
    }
  }

  deleteGame(): void {
    this.deleteGameEvent.emit(this.game);
  }

  decideRoute(game: Game): string {
    return game?.playerIdofCurrentUser
      ? `/game/${game.id}/${game.playerIdofCurrentUser}`
      : `/game/${game.id}`;
  }

  setCurrentClasses(game: Game): Record<string, boolean> {
    return {
      'game-state': true,
      'game-state-reg': game?.state === 'Registration',
      'game-state-in-prog': game?.state === 'In Progress',
      'game-state-compl': game?.state === 'Complete',
    };
  }

  handleLogin(): void {
    if (!this.isLoggedIn) {
      this.keycloakService.login();
    }
  }

  private fetchCityPhotoByName(cityName: string): void {
    fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${environment.UNSPLASH_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const photo = data.results[0];
        this.imgUrl = photo.urls.regular;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
