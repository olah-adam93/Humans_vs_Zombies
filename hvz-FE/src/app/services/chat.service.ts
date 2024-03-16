import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateChat } from '../models/CreateChat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getGlobalChatByGame(gameId: number): Observable<CreateChat[]> {
    return this.http
      .get<CreateChat[]>(`${this.GAME_URL}/${gameId}/chat?faction=global`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch global chat.', error);
          return throwError(() => new Error('Failed to fetch global chat.'));
        })
      );
  }

  public getHumanChatByGame(gameId: number): Observable<CreateChat[]> {
    return this.http
      .get<CreateChat[]>(`${this.GAME_URL}/${gameId}/chat?faction=human`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch human chat.', error);
          return throwError(() => new Error('Failed to fetch human chat.'));
        })
      );
  }

  public getZombieChatByGame(gameId: number): Observable<CreateChat[]> {
    return this.http
      .get<CreateChat[]>(`${this.GAME_URL}/${gameId}/chat?faction=zombie`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch zombie chat.', error);
          return throwError(() => new Error('Failed to fetch zombie chat.'));
        })
      );
  }

  public sendChat(chat: CreateChat): Observable<void> {
    return this.http
      .post<void>(`${this.GAME_URL}/${chat.game}/chat`, chat)
      .pipe(
        catchError((error) => {
          console.error('Failed to send chat.', error);
          return throwError(() => new Error('Failed to send chat.'));
        })
      );
  }
}
