import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/Game';
import { CreateGame } from '../models/CreateGame';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.GAME_URL);
  }

  public getGame(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${this.GAME_URL}/${gameId}`);
  }

  public saveGame(game: CreateGame): Observable<any> {
    return this.http.post<any>(this.GAME_URL, game, { observe: 'response' });
  }

  public updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.GAME_URL}/${game.id}`, game);
  }

  public patchGame(gameId: number, body: any): Observable<void> {
    return this.http.put<void>(`${this.GAME_URL}/${gameId}`, body);
  }

  public deleteGame(gameId: number): Observable<Object> {
    return this.http.delete<Object>(`${this.GAME_URL}/${gameId}`);
  }
}
