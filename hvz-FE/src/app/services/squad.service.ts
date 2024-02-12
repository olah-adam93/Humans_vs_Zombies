import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Squad } from '../models/Squad';
import { SquadMember } from '../models/SquadMember';

@Injectable({
  providedIn: 'root',
})
export class SquadService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getAllSquadsInGame(gameId: string): Observable<Squad[]> {
    return this.http.get<Squad[]>(`${this.GAME_URL}/${gameId}/squad`);
  }

  public getSquadById(gameId: string, squadId: string): Observable<Squad> {
    return this.http.get<Squad>(`${this.GAME_URL}/${gameId}/squad/${squadId}`);
  }

  public addSquadToGame(gameId: string, squad: Squad): Observable<Squad> {
    return this.http.post<Squad>(`${this.GAME_URL}/${gameId}/squad`, squad);
  }

  public addSquadMemberToSquad(
    gameId: string,
    squadId: string,
    squadMember: SquadMember
  ): Observable<Squad> {
    return this.http.post<Squad>(
      `${this.GAME_URL}/${gameId}/squad/${squadId}/join`,
      squadMember
    );
  }

  public updateSquad(gameId: string, squad: Squad): Observable<Squad> {
    return this.http.put<Squad>(
      `${this.GAME_URL}/${gameId}/squad/${squad.id}`,
      squad
    );
  }

  public patchSquad(
    gameId: string,
    squad: Squad,
    body: any
  ): Observable<Squad> {
    return this.http.put<Squad>(
      `${this.GAME_URL}/${gameId}/squad/${squad.id}`,
      body
    );
  }

  public deleteSquad(gameId: string, squadId: string): Observable<Object> {
    return this.http.delete<Object>(
      `${this.GAME_URL}/${gameId}/squad/${squadId}`
    );
  }
}
