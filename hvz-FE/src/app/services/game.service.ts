import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
    return this.http.get<Game[]>(this.GAME_URL).pipe(
      catchError((error) => {
        console.error('Failed to fetch games.', error);
        return throwError(() => new Error('Failed to fetch games.'));
      })
    );
  }

  public getGame(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${this.GAME_URL}/${gameId}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch game.', error);
        return throwError(() => new Error('Failed to fetch game.'));
      })
    );
  }
  public saveGame(game: CreateGame): Observable<any> {
    return this.http
      .post<any>(this.GAME_URL, game, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('Failed to save game.', error);
          return throwError(() => new Error('Failed to save game.'));
        })
      );
  }

  public updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.GAME_URL}/${game.id}`, game).pipe(
      catchError((error) => {
        console.error('Failed to update game.', error);
        return throwError(() => new Error('Failed to update game.'));
      })
    );
  }

  public patchGame(gameId: number, body: any): Observable<void> {
    return this.http.put<void>(`${this.GAME_URL}/${gameId}`, body).pipe(
      catchError((error) => {
        console.error('Failed to patch game.', error);
        return throwError(() => new Error('Failed to patch game.'));
      })
    );
  }

  public deleteGame(gameId: number): Observable<Object> {
    return this.http.delete<Object>(`${this.GAME_URL}/${gameId}`).pipe(
      catchError((error) => {
        console.error('Failed to delete game.', error);
        return throwError(() => new Error('Failed to delete game.'));
      })
    );
  }
}
