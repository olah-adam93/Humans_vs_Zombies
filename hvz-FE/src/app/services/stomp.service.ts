import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  socket = new SockJS('http://localhost:8080/websocket');
  stompClient = Stomp.over(this.socket);

  constructor() {}

  public subscribe(topic: string, callback: any): any {
    const connected: boolean = this.stompClient.connected;

    if (connected) {
      return this.subscribeToTopic(topic, callback);
    }
  }

  public connectToServer(): void {
    this.stompClient.connect({}, (): any => {
      console.log('connected from connect Callback');
    });
  }

  private subscribeToTopic(topic: string, callback: any): any {
    let subscription: any = this.stompClient.subscribe(
      topic,
      (response?: string): any => {
        callback(response);
      }
    );

    return subscription;
  }

  public unsubscribeFromTopic(subscription: any) {
    subscription.unsubscribe();
  }
}
