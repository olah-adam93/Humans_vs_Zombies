import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Game } from '../../models/Game';
import { Player } from '../../models/Player';

import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { StompService } from '../../services/stomp.service';
import { LoginUserService } from 'src/app/services/login-user.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit, OnDestroy {
  public game?: Game;
  public player?: Player;
  public players?: Player[];
  public humans?: Player[];
  public zombies?: Player[];
  public username?: string;
  public keycloakId?: string;
  public messageTyp?: string;

  public gameIdReadFromRoute?: number;
  public playerIdReadFromRoute?: number;

  public routeSubscription?: Subscription;
  public wsGameSubscription?: Subscription;
  public wsKillSubscription?: Subscription;

  public isMapLoaded: boolean = false;
  public isPlayerLoaded: boolean = false;
  public isGameLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    private loginUserService: LoginUserService,
    private authService: AuthService,
    private stompService: StompService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.userName;
    this.keycloakId = this.authService.keycloakId;
    this.isMapLoaded = true;

    this.setupRouteSubscription();
    this.handleLoginUser();
    this.loadGameAndPlayers();
    this.setupWebSocketSubscriptions();
  }

  handleLoginUser(): void {
    this.loginUserService.getLoginUser(this.keycloakId).subscribe({
      next: (playersFromServer: Player[]) => {
        if (this.playerIdReadFromRoute) {
          if (
            !this.getPlayerId(playersFromServer) ||
            this.getPlayerId(playersFromServer) != this.playerIdReadFromRoute
          ) {
            this.router.navigateByUrl(`game/${this.gameIdReadFromRoute}`);
          } else {
            this.player = playersFromServer.find(
              (player) => player.id == this.getPlayerId(playersFromServer)
            );
          }
        } else {
          if (this.getPlayerId(playersFromServer)) {
            this.router.navigateByUrl(
              `game/${this.gameIdReadFromRoute}/${this.getPlayerId(
                playersFromServer
              )}`
            );
          }
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getPlayerId(playersOfUser: Player[]): number | undefined {
    let playerId: number | undefined = undefined;
    playersOfUser.forEach((player) => {
      if (this.game?.id === player?.game) {
        playerId = player.id;
      }
    });
    return playerId;
  }

  async loadGameAndPlayers(): Promise<void> {
    try {
      await this.loadGame();
      await this.loadPlayers();
      await this.loadPlayerById();
    } catch (error) {
      console.error('Error loading game and players:', error);
    }
  }

  async loadGame(): Promise<void> {
    if (!this.gameIdReadFromRoute) return;

    try {
      this.game = await firstValueFrom(
        this.gameService.getGame(this.gameIdReadFromRoute)
      );
      this.isGameLoaded = true;
    } catch (error) {
      console.error('Error loading game:', error);
      throw error;
    }
  }

  private async loadPlayers(): Promise<void> {
    if (!this.gameIdReadFromRoute) return;

    try {
      this.players = await firstValueFrom(
        this.playerService.getAllPlayersInGame(this.gameIdReadFromRoute)
      );
      this.humans = this.players?.filter((player) => player.isHuman);
      this.zombies = this.players?.filter((player) => !player.isHuman);

      this.isPlayerLoaded = true;
    } catch (error) {
      console.error('Error loading players:', error);
      throw error;
    }
  }

  private async loadPlayerById(): Promise<void> {
    if (!this.gameIdReadFromRoute || !this.playerIdReadFromRoute) return;

    try {
      this.player = await firstValueFrom(
        this.playerService.getPlayerById(
          this.gameIdReadFromRoute,
          this.playerIdReadFromRoute
        )
      );
    } catch (error) {
      console.error('Error loading player by ID:', error);
      throw error;
    }
  }

  private setupRouteSubscription(): void {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.gameIdReadFromRoute = parseInt(param.get('gameId') || '', 10);
        if (param.get('playerId')) {
          this.playerIdReadFromRoute = parseInt(
            param.get('playerId') || '',
            10
          );
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  private async setupGameSubscription(): Promise<void> {
    try {
      await new Promise<void>(() => {
        this.wsGameSubscription = this.stompService.subscribe(
          `/topic/game/${this.gameIdReadFromRoute}`,
          (response: any): void => {
            setTimeout(() => {
              this.handleGameUpdate(response.body);
            }, 500);
          }
        );
      });
    } catch (error) {
      console.error('Error setting up game subscription:', error);
      throw error;
    }
  }

  private async setupKillSubscription(): Promise<void> {
    try {
      await new Promise<void>(() => {
        this.wsKillSubscription = this.stompService.subscribe(
          '/topic/kill',
          (): void => {
            setTimeout(() => {
              this.handleKillNotification();
            }, 500);
          }
        );
      });
    } catch (error) {
      console.error('Error setting up kill subscription:', error);
      throw error;
    }
  }

  private setupWebSocketSubscriptions(): void {
    this.setupGameSubscription();
    this.setupKillSubscription();
  }

  private handleGameUpdate(body: any): void {
    if (this.game && this.player?.id) {
      this.loadGameAndPlayers();

      switch (body) {
        case 'update_game_start':
          this.setNotification('patient_zero');
          break;
        case 'update_game_end':
          this.setNotification('game_over');
          break;
        default:
          break;
      }
    }
  }

  private handleKillNotification(): void {
    this.setNotification('kill');
    this.loadPlayers();
    this.loadPlayerById();
  }

  public setNotification(messageType: string): void {
    this.messageTyp = messageType;
    setTimeout(() => {
      this.messageTyp = undefined;
    }, 500);
  }

  handleJoinGame() {
    this.loadGameAndPlayers().then(() => {
      this.setNotification('game_join');
    });
  }

  handleLeaveGame() {
    this.loadGameAndPlayers().then(() => {
      this.setNotification('game_leave');
    });
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

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.wsGameSubscription) {
      this.stompService.unsubscribeFromTopic(this.wsGameSubscription);
    }
    if (this.wsKillSubscription) {
      this.stompService.unsubscribeFromTopic(this.wsKillSubscription);
    }
  }
}
