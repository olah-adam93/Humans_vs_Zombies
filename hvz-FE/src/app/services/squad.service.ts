import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Squad } from '../models/Squad';
import { SquadMember } from '../models/SquadMember';

@Injectable({
  providedIn: 'root',
})
export class SquadService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getAllSquadsInGame(gameId: string): Observable<Squad[]> {
    return this.http.get<Squad[]>(`${this.GAME_URL}/${gameId}/squad`).pipe(
      catchError((error) => {
        console.error('Failed to fetch squads.', error);
        return throwError(() => new Error('Failed to fetch squads.'));
      })
    );
  }

  public getSquadById(gameId: string, squadId: string): Observable<Squad> {
    return this.http
      .get<Squad>(`${this.GAME_URL}/${gameId}/squad/${squadId}`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch squad.', error);
          return throwError(() => new Error('Failed to fetch squad.'));
        })
      );
  }

  public addSquadToGame(gameId: string, squad: Squad): Observable<Squad> {
    return this.http
      .post<Squad>(`${this.GAME_URL}/${gameId}/squad`, squad)
      .pipe(
        catchError((error) => {
          console.error('Failed to add squad to game.', error);
          return throwError(() => new Error('Failed to add squad to game.'));
        })
      );
  }

  public addSquadMemberToSquad(
    gameId: string,
    squadId: string,
    squadMember: SquadMember
  ): Observable<Squad> {
    return this.http
      .post<Squad>(
        `${this.GAME_URL}/${gameId}/squad/${squadId}/join`,
        squadMember
      )
      .pipe(
        catchError((error) => {
          console.error('Failed to add squad member to squad.', error);
          return throwError(
            () => new Error('Failed to add squad member to squad.')
          );
        })
      );
  }

  public updateSquad(gameId: string, squad: Squad): Observable<Squad> {
    return this.http
      .put<Squad>(`${this.GAME_URL}/${gameId}/squad/${squad.id}`, squad)
      .pipe(
        catchError((error) => {
          console.error('Failed to update squad.', error);
          return throwError(() => new Error('Failed to update squad.'));
        })
      );
  }

  public patchSquad(
    gameId: string,
    squad: Squad,
    body: any
  ): Observable<Squad> {
    return this.http
      .put<Squad>(`${this.GAME_URL}/${gameId}/squad/${squad.id}`, body)
      .pipe(
        catchError((error) => {
          console.error('Failed to patch squad.', error);
          return throwError(() => new Error('Failed to patch squad.'));
        })
      );
  }

  public deleteSquad(gameId: string, squadId: string): Observable<Object> {
    return this.http
      .delete<Object>(`${this.GAME_URL}/${gameId}/squad/${squadId}`)
      .pipe(
        catchError((error) => {
          console.error('Failed to delete squad.', error);
          return throwError(() => new Error('Failed to delete squad.'));
        })
      );
  }
}
