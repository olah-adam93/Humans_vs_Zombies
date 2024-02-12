import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/Player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getAllPlayersInGame(gameId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.GAME_URL}/${gameId}/player`);
  }

  public getPlayerById(gameId: number, playerId: number): Observable<Player> {
    return this.http.get<Player>(
      `${this.GAME_URL}/${gameId}/player/${playerId}`
    );
  }

  public addPlayerToGame(gameId: string, player: Player): Observable<any> {
    return this.http.post<any>(`${this.GAME_URL}/${gameId}/player`, player, {
      observe: 'response',
    });
  }

  public updatePlayer(gameId: string, player: Player): Observable<Player> {
    return this.http.put<Player>(
      `${this.GAME_URL}/${gameId}/player/${player.id}`,
      player
    );
  }

  public patchPlayer(
    gameId: string,
    player: Player,
    body: any
  ): Observable<Player> {
    return this.http.put<Player>(
      `${this.GAME_URL}/${gameId}/player/${player.id}`,
      body
    );
  }

  public deletePalyer(gameId: string, playerId: string): Observable<Object> {
    return this.http.delete<Object>(
      `${this.GAME_URL}/${gameId}/player/${playerId}`
    );
  }
}
