import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { LoginUserService } from '../../services/login-user.service';
import { Player } from '../../models/Player';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateGame } from '../../models/CreateGame';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { StompService } from '../../services/stomp.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
  public games: Game[] = [];
  public gameFormVisible = false;
  public wsGameSubs?: any;

  public gameForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  get isLoggedIn(): Boolean | undefined {
    return this.keycloakService.isAuthenticated;
  }

  public get isUserAdmin(): Boolean | undefined {
    return this.keycloakService.isUserAdmin;
  }

  constructor(
    private gameService: GameService,
    private loginUserService: LoginUserService,
    private keycloakService: KeycloakService,
    private stompService: StompService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGames();
    this.subscribeToGameUpdates();
  }

  private loadGames(): void {
    this.gameService.getGames().subscribe({
      next: (gamesFromServer: Game[]) => {
        this.games = gamesFromServer;
        console.log('Games loaded:', this.games);
        if (this.keycloakService.isAuthenticated) {
          this.loadPlayerIdsForCurrentUser();
        }
      },
      error: (e) => console.error('Error loading games:', e),
    });
  }

  private loadPlayerIdsForCurrentUser(): void {
    this.loginUserService
      .getLoginUser(this.keycloakService.keycloakId)
      .subscribe({
        next: (playersFromServer: Player[]) => {
          playersFromServer.forEach((player) => {
            const game = this.games.find((game) => game.id === player.game);
            if (game) {
              game.playerIdofCurrentUser = player.id;
            }
          });
          console.log('Player IDs loaded for current user:', this.games);
        },
        error: (e) => {
          console.error('Error loading player IDs:', e);
          if (e.status === 404) {
            this.createLoginUser();
          }
        },
      });
  }

  private createLoginUser(): void {
    const newLoginUser = {
      firstName: this.keycloakService.firstName,
      lastName: this.keycloakService.lastName,
      keycloakId: this.keycloakService.keycloakId,
      userName: this.keycloakService.username,
    };
    this.loginUserService.saveLoginUser(newLoginUser).subscribe({
      next: () => console.log('Login user created'),
      error: (e) => console.error('Error creating login user:', e),
    });
  }

  private subscribeToGameUpdates(): void {
    setTimeout(() => {
      this.wsGameSubs = this.stompService.subscribe(
        '/topic/game',
        (response: any): void => {
          console.log('Game update notification received');
          this.loadGames();
        }
      );
    }, 1000);
  }

  setCurrentClasses(game: Game): Record<string, boolean> {
    return {
      'game-state': true,
      'game-state-reg': game.state === 'Registration',
      'game-state-in-prog': game.state === 'In Progress',
      'game-state-compl': game.state === 'Complete',
    };
  }

  decideRoute(game: Game): string {
    return game.playerIdofCurrentUser
      ? `/game/${game.id}/${game.playerIdofCurrentUser}`
      : `/game/${game.id}`;
  }

  deleteGame(gameToDelete: Game): void {
    this.gameService.deleteGame(gameToDelete.id).subscribe({
      next: () => {
        console.log('Game deleted:', gameToDelete.id);
        this.games = this.games.filter((game) => game.id !== gameToDelete.id);
      },
      error: (e) => console.error('Error deleting game:', e),
    });
  }

  createGame() {
    if (this.gameForm.valid) {
      const newGame: CreateGame = {
        name: this.gameForm.get('name')?.value,
        location: this.gameForm.get('location')?.value,
        state: 'Registration',
      };
      this.gameService.saveGame(newGame).subscribe({
        next: (response) => {
          console.log('Game created');
          const locationFromHeaders = response.headers
            .get('Location')
            ?.split('/');
          const gameId = locationFromHeaders
            ? locationFromHeaders[locationFromHeaders.length - 1]
            : '';
          this.gameForm.reset();
          this.router.navigateByUrl(`/admin/${gameId}`);
        },
        error: (e) => console.error('Error creating game:', e),
      });
    }
  }

  openGameForm(): void {
    this.gameFormVisible = true;
  }

  closeGameForm(): void {
    this.gameFormVisible = false;
    this.gameForm.reset();
  }

  handleLogin(): void {
    this.keycloakService.login();
  }

  formattedAddress = '';
  options = {
    types: ['(cities)'],
  } as Options;

  handleAddressChange(address: any) {
    this.formattedAddress = address.vicinity ? address.vicinity : address.name;
    console.log('Formatted address:', this.formattedAddress);
  }

  ngOnDestroy(): void {
    if (this.wsGameSubs) {
      this.stompService.unsubscribeFromTopic(this.wsGameSubs);
    }
  }
}
