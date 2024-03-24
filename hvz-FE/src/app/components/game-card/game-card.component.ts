import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input() public game!: Game;
  @Output() deleteGameEvent = new EventEmitter<Game>();

  constructor(private keycloakService: KeycloakService) {}

  get isUserAdmin(): boolean {
    return !!this.keycloakService.isUserAdmin;
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
}
