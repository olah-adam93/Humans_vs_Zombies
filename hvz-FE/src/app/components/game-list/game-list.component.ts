import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { CreateGame } from '../../models/CreateGame';
import { GameService } from '../../services/game.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { LoginUserService } from '../../services/login-user.service';
import { StompService } from '../../services/stomp.service';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { GoogleMapsLoaderService } from 'src/app/services/google-maps-loader.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
  @Input() deleteGameEvent?: EventEmitter<Game>;
  public games: Game[] = [];
  public gameFormVisible = false;
  private wsGameSubs?: Subscription;

  public gameForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  get isLoggedIn(): boolean {
    return this.keycloakService.isAuthenticated;
  }

  get isUserAdmin(): boolean {
    return !!this.keycloakService.isUserAdmin;
  }

  constructor(
    private gameService: GameService,
    private loginUserService: LoginUserService,
    private keycloakService: KeycloakService,
    private googleMapsLoaderService: GoogleMapsLoaderService,
    private stompService: StompService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGames();
    this.loadMaps();
    this.subscribeToGameUpdates();
  }

  private loadGames(): void {
    this.gameService.getGames().subscribe({
      next: (gamesFromServer: Game[]) => {
        this.games = gamesFromServer;
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
        },
        error: (e) => {
          console.error('Error loading player IDs:', e);
          if (e.status === 404) {
            this.createLoginUser();
          }
        },
      });
  }

  loadMaps(): void {
    this.googleMapsLoaderService.loadGoogleMaps(
      environment.GOOGLE_MAPS_API_KEY
    );
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
    this.wsGameSubs = this.stompService.subscribe(
      '/topic/game',
      (response: any): void => {
        this.loadGames();
      }
    );
  }

  decideRoute(game: Game): string {
    return game.playerIdofCurrentUser
      ? `/game/${game.id}/${game.playerIdofCurrentUser}`
      : `/game/${game.id}`;
  }

  deleteGame(game: Game): void {
    this.gameService.deleteGame(game.id).subscribe({
      next: () => {
        console.log('Game deleted:', game.id);
      },
      error: (e) => console.error('Error deleting game:', e),
    });
  }

  public createGame() {
    if (this.gameForm.valid) {
      const newGame: CreateGame = {
        name: this.gameForm.get('name')?.value,
        location: this.formattedAddress,
        state: 'Registration',
      };
      this.gameService.saveGame(newGame).subscribe({
        next: (response) => {
          console.log('Game created');
          const locationFromHeaders = response.headers
            .get('Location')
            .split('/');
          const gameId = locationFromHeaders[locationFromHeaders.length - 1];
          this.gameForm.reset();
          this.router.navigateByUrl(`/admin/${gameId}`);
        },
        error: (e) => {
          console.log(e);
        },
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
  }

  ngOnDestroy(): void {
    if (this.wsGameSubs) {
      this.stompService.unsubscribeFromTopic(this.wsGameSubs);
    }
  }
}
