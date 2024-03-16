import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Kill } from '../models/Kill';
import { CreateKill } from '../models/CreateKill';

@Injectable({
  providedIn: 'root',
})
export class KillService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  getAllKillsInGame(gameId: string): Observable<Kill[]> {
    return this.http.get<Kill[]>(`${this.GAME_URL}/${gameId}/kill`).pipe(
      catchError((error) => {
        console.error('Failed to fetch kills.', error);
        return throwError(() => new Error('Failed to fetch kills.'));
      })
    );
  }

  getKillById(gameId: string, killId: string): Observable<Kill> {
    return this.http
      .get<Kill>(`${this.GAME_URL}/${gameId}/kill/${killId}`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch kill.', error);
          return throwError(() => new Error('Failed to fetch kill.'));
        })
      );
  }

  registerKill(kill: CreateKill): Observable<Kill> {
    return this.http
      .post<Kill>(`${this.GAME_URL}/${kill.game}/kill`, kill)
      .pipe(
        catchError((error) => {
          console.error('Failed creating kill.', error);
          return throwError(() => new Error('Failed to create kill.'));
        })
      );
  }

  updateKill(gameId: string, kill: Kill): Observable<Kill> {
    return this.http
      .put<Kill>(`${this.GAME_URL}/${gameId}/kill/${kill.id}`, kill)
      .pipe(
        catchError((error) => {
          console.error('Failed updating kill.', error);
          return throwError(() => new Error('Failed to update kill.'));
        })
      );
  }

  patchKill(gameId: string, kill: Kill, body: any): Observable<Kill> {
    return this.http
      .put<Kill>(`${this.GAME_URL}/${gameId}/kill/${kill.id}`, body)
      .pipe(
        catchError((error) => {
          console.error('Failed patching kill.', error);
          return throwError(() => new Error('Failed to patch kill.'));
        })
      );
  }

  deleteKill(gameId: string, killId: string): Observable<Object> {
    return this.http
      .delete<Object>(`${this.GAME_URL}/${gameId}/kill/${killId}`)
      .pipe(
        catchError((error) => {
          console.error('Failed deleting kill.', error);
          return throwError(() => new Error('Failed to delete kill.'));
        })
      );
  }
}
