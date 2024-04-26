import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { AuthService } from 'src/app/services/auth.service';
import { Player } from 'src/app/models/Player';
import { Game } from 'src/app/models/Game';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss'],
})
export class GameDescriptionComponent {
  @Output() joinGameEvent = new EventEmitter<void>();
  @Output() leaveGameEvent = new EventEmitter<void>();
  @Input() game?: Game;
  @Input() username?: string;
  @Input() player?: Player;

  @Input() players?: Player[];
  @Input() humans?: Player[];
  @Input() zombies?: Player[];

  public messageTyp?: string;
  public joinInProgress: boolean = false;

  constructor(
    private playerService: PlayerService,
    private authService: AuthService
  ) {}

  async joinGame() {
    if (!this.game?.id || this.joinInProgress) return;

    this.joinInProgress = true;

    const newPlayer: Player = {
      isHuman: true,
      isPatientZero: false,
      game: this.game.id,
      keycloakId: this.authService.keycloakId,
    };

    try {
      const response = await firstValueFrom(
        this.playerService.addPlayerToGame(this.game.id, newPlayer)
      );
      this.joinGameEvent.emit();

      const locationFromHeaders = response.headers.get('Location')?.split('/');
      const playerId = locationFromHeaders?.[locationFromHeaders.length - 1];

      if (playerId) {
        const player = await firstValueFrom(
          this.playerService.getPlayerById(this.game.id, playerId)
        );
        this.player = player;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.joinInProgress = false;
    }
  }

  async leaveGame() {
    if (!this.game?.id || !this.player?.id) return;

    try {
      await firstValueFrom(
        this.playerService.deletePlayer(this.game.id, this.player.id)
      );
      this.leaveGameEvent.emit();

      const players = await firstValueFrom(
        this.playerService.getAllPlayersInGame(this.game.id)
      );
      this.players = players;
      this.player = undefined;
    } catch (e) {
      console.log(e);
    }
  }
}
