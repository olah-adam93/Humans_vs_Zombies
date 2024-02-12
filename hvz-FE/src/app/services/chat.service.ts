import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateChat } from '../models/CreateChat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getGlobalChatbyGame(gameId: number): Observable<CreateChat[]> {
    return this.http.get<CreateChat[]>(
      `${this.GAME_URL}/${gameId}/chat?faction=global`
    );
  }

  public getHumanChatbyGame(gameId: number): Observable<CreateChat[]> {
    return this.http.get<CreateChat[]>(
      `${this.GAME_URL}/${gameId}/chat?faction=human`
    );
  }

  public getZombieChatbyGame(gameId: number): Observable<CreateChat[]> {
    return this.http.get<CreateChat[]>(
      `${this.GAME_URL}/${gameId}/chat?faction=zombie`
    );
  }

  public sendChat(chat: CreateChat): Observable<void> {
    return this.http.post<void>(`${this.GAME_URL}/${chat.game}/chat`, chat);
  }
}
