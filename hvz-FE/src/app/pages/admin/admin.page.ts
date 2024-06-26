import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { StompService } from '../../services/stomp.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  public gameIdReadFromRoute?: any;
  public game?: Game;
  public players?: Player[];
  public username?: string;
  public isAdmin?: boolean;
  private routeDestroyed$ = new Subject<void>();

  private wsGameSubscription?: Subscription;
  private wsKillSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    private authService: AuthService,
    private stompService: StompService
  ) {}

  ngOnInit(): void {
    this.setupRouteSubscription();
    this.initializeUser();
    this.loadGameAndPlayers();
    this.setupWebsocketSubscriptions();
  }

  private setupRouteSubscription(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.routeDestroyed$))
      .subscribe({
        next: (param) => {
          this.gameIdReadFromRoute = param.get('gameId');
        },
        error: (error) => {
          console.error('Error occurred in route subscription:', error);
        },
      });
  }

  private initializeUser(): void {
    this.username = this.authService.userName;
    this.isAdmin = this.authService.isUserAdmin;
  }

  private loadGame(): void {
    if (!this.gameIdReadFromRoute) return;

    this.gameService.getGame(this.gameIdReadFromRoute).subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (e) => {
        console.error('Error loading game:', e);
      },
    });
  }

  private loadPlayers(): void {
    if (!this.gameIdReadFromRoute) return;

    this.playerService.getAllPlayersInGame(this.gameIdReadFromRoute).subscribe({
      next: (players) => {
        this.players = players;
      },
      error: (e) => {
        console.error('Error loading players:', e);
      },
    });
  }

  private loadGameAndPlayers(): void {
    this.loadGame();
    this.loadPlayers();
  }

  private subscribeToGameUpdates(): void {
    if (!this.gameIdReadFromRoute) return;

    this.wsGameSubscription = this.stompService.subscribe(
      `/topic/game/${this.gameIdReadFromRoute}`,
      (response: any): void => {
        this.refreshGameAndPlayers();
      }
    );
  }

  private subscribeToKillUpdates(): void {
    if (!this.gameIdReadFromRoute) return;

    this.wsKillSubscription = this.stompService.subscribe(
      `/topic/kill/${this.gameIdReadFromRoute}`,
      (response: any): void => {
        this.refreshPlayers();
      }
    );
  }

  private setupWebsocketSubscriptions(): void {
    setTimeout(() => {
      this.subscribeToGameUpdates();
      this.subscribeToKillUpdates();
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
    this.routeDestroyed$.next();
    this.routeDestroyed$.complete();
    this.wsGameSubscription?.unsubscribe();
    this.wsKillSubscription?.unsubscribe();
  }
}
