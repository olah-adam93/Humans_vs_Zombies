import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { AuthService } from 'src/app/services/auth.service';
import { Player } from 'src/app/models/Player';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss'],
})
export class GameDescriptionComponent {
  @Input() game?: Game;
  @Input() username?: string;
  @Input() player?: Player;

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router
  ) {}

  public joinGame(): void {
    if (!this.game?.id) return;

    const newPlayer: Player = {
      isHuman: true,
      isPatientZero: false,
      game: this.game?.id || 0,
      keycloakId: this.authService.keycloakId,
    };

    this.playerService.addPlayerToGame(this.game?.id, newPlayer).subscribe({
      next: (response: any) => {
        console.log('Player added');
        const locationFromHeaders = response.headers
          .get('Location')
          ?.split('/');
        const playerId = locationFromHeaders
          ? locationFromHeaders[locationFromHeaders.length - 1]
          : '';
        this.router.navigateByUrl(`game/${this.game?.id}/${playerId}`);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public leaveGame(): void {
    if (!this.game?.id || !this.player?.id) return;

    this.playerService.deletePlayer(this.game?.id, this.player?.id).subscribe({
      next: () => {
        console.log('Player deleted');
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.router.navigateByUrl(`game/${this.game?.id}`);
  }

  public setCurrentClasses(game: Game | undefined): Record<string, boolean> {
    if (game) {
      return {
        'game-state': true,
        'game-state-reg': game.state === 'Registration',
        'game-state-in-prog': game.state === 'In Progress',
        'game-state-compl': game.state === 'Complete',
      };
    } else {
      return {
        'game-state': true,
      };
    }
  }
}
