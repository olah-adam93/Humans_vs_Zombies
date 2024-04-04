import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { Squad } from '../../models/Squad';
import { Kill } from '../../models/Kill';
import { CreateKill } from '../../models/CreateKill';

import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { KillService } from '../../services/kill.service';
import { StompService } from '../../services/stomp.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit, OnDestroy {
  public gameIdReadFromRoute?: any;
  public playerIdReadFromRoute?: any;
  public routeSubscription?: Subscription;
  public game?: Game;
  public player?: Player;
  public players?: Player[];
  public humans?: Player[];
  public zombies?: Player[];
  public allSquads?: Squad[];
  public allKills?: Kill[];
  public username?: string;
  public selectedTab: string = 'global';
  public wsGameSubscription?: Subscription;
  public wsKillSubscription?: Subscription;
  public randomFailureMessage?: string;
  public messageType: 'success' | 'failure' | 'none' = 'none';

  public killForm: FormGroup = new FormGroup({
    biteCode: new FormControl('', Validators.required),
    killStory: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    private authService: AuthService,
    private killService: KillService,
    private stompService: StompService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupRouteSubscription();
    this.username = this.authService.userName;
    this.randomFailureMessage = this.getRandomBiteFailureMessage();
    this.loadGameAndPlayers();
    this.setupWebSocketSubscriptions();
  }

  private setupRouteSubscription(): void {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.gameIdReadFromRoute = param.get('gameId') || '';
        this.playerIdReadFromRoute = param.get('playerId') || '';
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  private loadGame(): void {
    if (!this.gameIdReadFromRoute) return;

    this.gameService.getGame(this.gameIdReadFromRoute).subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  private loadPlayers(): void {
    if (!this.gameIdReadFromRoute) return;

    this.playerService.getAllPlayersInGame(this.gameIdReadFromRoute).subscribe({
      next: (players) => {
        this.players = players;

        this.humans = players.filter((player) => player.isHuman);

        this.zombies = players.filter((player) => !player.isHuman);
        console.log('All players', this.players);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  private loadPlayerById(): void {
    if (!this.gameIdReadFromRoute || !this.playerIdReadFromRoute) return;

    this.playerService
      .getPlayerById(this.gameIdReadFromRoute, this.playerIdReadFromRoute)
      .subscribe({
        next: (player) => {
          this.player = player;
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  private loadGameAndPlayers(): void {
    this.loadGame();
    this.loadPlayers();
    this.loadPlayerById();
  }

  private setupWebSocketSubscriptions(): void {
    setTimeout(() => {
      //websocket subscription to Game updates
      this.wsGameSubscription = this.stompService.subscribe(
        `/topic/game/${this.gameIdReadFromRoute}`,
        (response: any): void => {
          console.log('notified');
          console.log(response.body);

          this.refreshGame();
          if (this.game && this.player?.id) {
            this.refreshPlayer();
            if (response.body == 'update_game_start') {
              alert(
                `Game started! You ${
                  this.player.isPatientZero ? 'are' : 'are not'
                } Patient Zero`
              );
            }
            if (response.body == 'update_game_end') {
              alert('Game over');
            }
          }
        }
      );

      //websocket subscription to Kill
      this.wsKillSubscription = this.stompService.subscribe(
        `/topic/kill/${this.playerIdReadFromRoute}`,
        (response: any): void => {
          console.log('notified');
          console.log(response.body);

          this.refreshGame();
          this.refreshPlayer();
          alert("You've been bitten! You are now a Zombie!");
        }
      );
    }, 1000);
  }

  get isBiteCodeEmpty(): boolean {
    return !this.killForm.get('biteCode')?.value;
  }

  get isKillStoryEmpty(): boolean {
    return !this.killForm.get('killStory')?.value;
  }

  public onKillSubmit(): void {
    const newKill: CreateKill = {
      time: new Date(Date.now()),
      location: 'some coordinates',
      killerId: this.player?.id || 0,
      biteCode: this.killForm.get('biteCode')?.value,
      story: this.killForm.get('killStory')?.value,
      game: this.game?.id || 0,
    };
    this.killService.registerKill(newKill).subscribe({
      next: () => {
        console.log('kill registered');
        this.showMessage('success'); // Display the success message
        setTimeout(() => {
          this.hideMessage();
        }, 3800); // Hide the message after a delay (e.g., 3000 ms)
        this.killForm.reset();
      },
      error: (e) => {
        console.log(e);
        this.showMessage('failure'); // Display the danger message
        setTimeout(() => {
          this.hideMessage();
        }, 3800); // Hide the message after a delay (e.g., 3000 ms)
        this.killForm.reset();
      },
    });
  }

  showMessage(type: 'success' | 'failure'): void {
    this.messageType = type;
  }

  hideMessage(): void {
    this.messageType = 'none'; // Hide the message
  }

  private getRandomBiteFailureMessage(): string {
    const failureMessages: string[] = [
      'Missed! Human dodged the bite.',
      'No luck! Human got away.',
      'Whoops! Human slipped out.',
      'Darn! Human escaped.',
      'Close call! Human dodged.',
      'Oops! Human outsmarted.',
      'Missed again! Human fled.',
      'No bite! Human too quick.',
      'Failed! Human slipped away.',
      'Zombie bite fail! Human free.',
    ];

    const randomIndex: number = Math.floor(
      Math.random() * failureMessages.length
    );
    return failureMessages[randomIndex];
  }

  public joinGame(): void {
    const newPlayer: Player = {
      isHuman: true,
      isPatientZero: false,
      game: this.game?.id || 0,
      keycloakId: this.authService.keycloakId,
    };

    this.playerService
      .addPlayerToGame(this.gameIdReadFromRoute, newPlayer)
      .subscribe({
        next: (response) => {
          console.log('Player added');
          const locationFromHeaders = response.headers
            .get('Location')
            ?.split('/');
          const playerId = locationFromHeaders[locationFromHeaders.length - 1];
          this.router.navigateByUrl(
            `game/${this.gameIdReadFromRoute}/${playerId}`
          );
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  public leaveGame(): void {
    this.playerService
      .deletePalyer(this.gameIdReadFromRoute, this.playerIdReadFromRoute || '')
      .subscribe({
        next: () => {
          console.log('Player deleted');
        },
        error: (e) => {
          console.log(e);
        },
      });
    this.router.navigateByUrl(`game/${this.gameIdReadFromRoute}`);
  }

  public refreshGame(): void {
    if (this.game) {
      this.gameService.getGame(this.game?.id).subscribe({
        next: (game: Game) => {
          this.game = game;
          console.log(game);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  public refreshPlayer(): void {
    if (this.game && this.player?.id) {
      this.playerService
        .getPlayerById(this.game?.id, this.player?.id)
        .subscribe({
          next: (player: Player) => {
            this.player = player;
          },
          error: (e) => {
            console.log(e);
          },
        });
    }
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
