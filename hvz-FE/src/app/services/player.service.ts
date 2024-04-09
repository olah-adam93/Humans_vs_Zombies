import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Player } from '../models/Player';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getAllPlayersInGame(gameId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.GAME_URL}/${gameId}/player`).pipe(
      catchError((error) => {
        console.error('Failed to fetch players.', error);
        return throwError(() => 'Failed to fetch players.');
      })
    );
  }

  public getPlayerById(gameId: number, playerId: number): Observable<Player> {
    return this.http
      .get<Player>(`${this.GAME_URL}/${gameId}/player/${playerId}`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch player.', error);
          return throwError(() => new Error('Failed to fetch player.'));
        })
      );
  }

  public addPlayerToGame(gameId: number, player: Player): Observable<any> {
    return this.http
      .post<any>(`${this.GAME_URL}/${gameId}/player`, player, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          console.error('Failed to add player to game.', error);
          return throwError(() => new Error('Failed to add player to game.'));
        })
      );
  }

  public updatePlayer(gameId: number, player: Player): Observable<Player> {
    return this.http
      .put<Player>(`${this.GAME_URL}/${gameId}/player/${player.id}`, player)
      .pipe(
        catchError((error) => {
          console.error('Failed to update player.', error);
          return throwError(() => new Error('Failed to update player.'));
        })
      );
  }

  public patchPlayer(
    gameId: number,
    player: Player,
    body: any
  ): Observable<Player> {
    return this.http
      .put<Player>(`${this.GAME_URL}/${gameId}/player/${player.id}`, body)
      .pipe(
        catchError((error) => {
          console.error('Failed to patch player.', error);
          return throwError(() => new Error('Failed to patch player.'));
        })
      );
  }

  public deletePlayer(gameId: number, playerId: number): Observable<Object> {
    return this.http
      .delete<Object>(`${this.GAME_URL}/${gameId}/player/${playerId}`)
      .pipe(
        catchError((error) => {
          console.error('Failed to delete player.', error);
          return throwError(() => new Error('Failed to delete player.'));
        })
      );
  }
}
