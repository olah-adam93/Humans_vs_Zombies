import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
import { KeycloakService } from 'keycloak-angular';
import { LoginUserService } from '../../services/login-user.service';
import { StompService } from '../../services/stomp.service';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { GoogleMapsLoaderService } from 'src/app/services/google-maps-loader.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() deleteGameEvent?: EventEmitter<Game>;

  public isLoggedIn?: boolean;
  public firstName?: string;
  public lastName?: string;
  public userName?: string;
  public keycloakId?: string;
  public isUserAdmin?: boolean;

  public games: Game[] = [];
  public gameFormVisible = false;
  private wsGameSubs?: Subscription;

  public gameForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  constructor(
    private gameService: GameService,
    private loginUserService: LoginUserService,
    private keycloakService: KeycloakService,
    private authService: AuthService,
    private googleMapsLoaderService: GoogleMapsLoaderService,
    private stompService: StompService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initUserAttributes();
    this.loadGames();
    this.loadMaps();
    this.subscribeToGameUpdates();
  }

  ngOnChanges(): void {
    if (this.keycloakId && this.isUserAdmin) {
      this.loadPlayerIdsForCurrentUser();
    }
  }

  private initUserAttributes(): void {
    this.isLoggedIn = this.authService.isAuthenticated;
    this.firstName = this.authService.firstName;
    this.lastName = this.authService.lastName;
    this.userName = this.authService.userName;
    this.keycloakId = this.authService.keycloakId;
    this.isUserAdmin = this.keycloakService.isUserInRole('Administrator');
  }

  private loadGames(): void {
    this.gameService.getGames().subscribe({
      next: (gamesFromServer: Game[]) => {
        this.games = gamesFromServer;
      },
      error: (e) => console.error('Error loading games:', e),
    });
  }

  private loadPlayerIdsForCurrentUser(): void {
    console.log('this is the keycloakId' + this.keycloakId);

    this.loginUserService.getLoginUser(this.keycloakId).subscribe({
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
      firstName: this.firstName,
      lastName: this.lastName,
      keycloakId: this.keycloakId,
      userName: this.userName,
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
          console.log('Game id:' + gameId);
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
