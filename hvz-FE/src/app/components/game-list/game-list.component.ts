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
  public gameFormVisible: Boolean = false;
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
    this.gameService.getGames().subscribe({
      next: (gamesFromServer: Game[]) => {
        this.games = gamesFromServer;
        console.log(this.games);
        //if user is logged in, load their playerId-s to relating Games
        if (this.keycloakService.isAuthenticated) {
          //get list of Players belonging to logged in User
          this.loginUserService
            .getLoginUser(this.keycloakService.keycloakId)
            .subscribe({
              next: (playersFromServer: Player[]) => {
                console.log(playersFromServer);
                //iterate through Players and Games, if there's a match, set PlayerId to Game
                playersFromServer.forEach((player) => {
                  let game = this.games.find((game) => game.id == player.game);
                  if (game) {
                    game.playerIdofCurrentUser = player.id;
                  }
                });
                console.log(this.games);
              },
              //if User is not in DB yet, error 404, create new User in DB
              error: (e) => {
                console.log(e);
                if (e.status == 404) {
                  const newLoginUser = {
                    firstName: this.keycloakService.firstName,
                    lastName: this.keycloakService.lastName,
                    keycloakId: this.keycloakService.keycloakId,
                    userName: this.keycloakService.username,
                  };
                  this.loginUserService.saveLoginUser(newLoginUser).subscribe({
                    next: (response) => {
                      console.log('LoginUser saved');
                    },
                    error: (e) => {
                      console.log(e);
                    },
                  });
                }
              },
            });
        }
      },
      error: (e) => console.log(e),
    });

    //websocket subscription
    setTimeout(() => {
      this.wsGameSubs = this.stompService.subscribe(
        '/topic/game',
        (response: any): void => {
          console.log('notified');
          console.log(response.body);

          this.gameService.getGames().subscribe({
            next: (gamesFromServer: Game[]) => {
              this.games = gamesFromServer;
            },
            error: (e) => console.log(e),
          });
        }
      );
    }, 1000);
  }

  // ngClass: CSS classes added/removed per current state of game
  setCurrentClasses(game: Game): Record<string, boolean> {
    return {
      'game-state': true,
      'game-state-reg': game.state === 'Registration',
      'game-state-in-prog': game.state === 'In Progress',
      'game-state-compl': game.state === 'Complete',
    };
  }

  //if user is player in game, opens details page with playerId in route
  public decideRoute(game: Game): string {
    if (game.playerIdofCurrentUser) {
      return `/game/${game.id}/${game.playerIdofCurrentUser}`;
    } else {
      return `/game/${game.id}`;
    }
  }

  public deleteGame(gameToDelete: Game): void {
    this.gameService.deleteGame(gameToDelete.id).subscribe({
      next: () => {
        console.log('Game deleted');
        this.games = this.games.filter((game) => game.id !== gameToDelete.id);
      },
      error: (e) => {
        console.log(e);
      },
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

  public openGameForm(): void {
    this.gameFormVisible = true;
  }

  public closeGameForm(): void {
    this.gameFormVisible = false;
    this.gameForm.reset();
  }

  handleLogin(): void {
    this.keycloakService.login();
  }

  // Handle location setting

  formattedAddress = '';

  options = {
    types: ['(cities)'],
  } as Options;

  public handleAddressChange(address: any) {
    this.formattedAddress = address.vicinity ? address.vicinity : address.name;
    console.log(this.formattedAddress);
  }

  ngOnDestroy(): void {
    if (this.wsGameSubs) {
      this.stompService.unsubscribeFromTopic(this.wsGameSubs);
    }
  }
}
