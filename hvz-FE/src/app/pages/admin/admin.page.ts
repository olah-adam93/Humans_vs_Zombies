import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { StompService } from '../../services/stomp.service';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  public gameIdReadFromRoute?: any;
  public game?: Game;
  public players?: Player[];
  public username = '';

  private routeSubscription?: Subscription;
  private wsGameSubscription?: Subscription;
  private wsKillSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    private keycloakService: KeycloakService,
    private stompService: StompService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.gameIdReadFromRoute = param.get('gameId');
      },
      error: (e) => {
        console.log(e);
      },
    });

    this.username = this.keycloakService.username ?? '';
    this.loadGameAndPlayers();
    this.setupWebsocketSubscriptions();
  }

  get isAdmin() {
    return this.keycloakService.isUserAdmin;
  }

  private loadGameAndPlayers(): void {
    if (!this.gameIdReadFromRoute) return;

    this.gameService.getGame(this.gameIdReadFromRoute).subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (e) => {
        console.log(e);
      },
    });

    this.playerService.getAllPlayersInGame(this.gameIdReadFromRoute).subscribe({
      next: (players) => {
        this.players = players;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  private setupWebsocketSubscriptions(): void {
    setTimeout(() => {
      if (!this.gameIdReadFromRoute) return;

      this.wsGameSubscription = this.stompService.subscribe(
        `/topic/game/${this.gameIdReadFromRoute}`,
        (response: any): void => {
          this.refreshGameAndPlayers();
        }
      );

      this.wsKillSubscription = this.stompService.subscribe(
        `/topic/kill/${this.gameIdReadFromRoute}`,
        (response: any): void => {
          this.refreshPlayers();
        }
      );
    }, 1000);
  }

  private refreshGameAndPlayers(): void {
    this.loadGameAndPlayers();
  }

  private refreshPlayers(): void {
    this.loadGameAndPlayers();
  }

  public changeGameState(state: string): void {
    if (!this.game) return;

    this.gameService.patchGame(this.game.id, { state: state }).subscribe({
      next: () => {
        console.log('Game state changed to ' + state);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public setCurrentClasses(game: Game | undefined): Record<string, boolean> {
    return {
      'game-state': true,
      'game-state-reg': game?.state === 'Registration',
      'game-state-in-prog': game?.state === 'In Progress',
      'game-state-compl': game?.state === 'Complete',
    };
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.wsGameSubscription?.unsubscribe();
    this.wsKillSubscription?.unsubscribe();
  }
}
