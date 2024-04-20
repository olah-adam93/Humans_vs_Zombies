import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() public game!: Game;
  //@Input() public isLoggedIn?: boolean;
  // @Input() public isUserAdmin?: boolean;
  @Output() deleteGameEvent = new EventEmitter<Game>();
  public isLoggedIn?: boolean;
  public isUserAdmin?: boolean;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.keycloakService?.isLoggedIn();
    this.isUserAdmin = this.keycloakService.isUserInRole('Administrator');
  }

  decideRoute(game: Game): string {
    return game?.playerIdofCurrentUser
      ? `/game/${game.id}/${game.playerIdofCurrentUser}`
      : `/game/${game.id}`;
  }

  deleteGame(): void {
    this.deleteGameEvent.emit(this.game);
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
}
