import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  socket = new SockJS(environment.WEBSOCKET_URL);
  stompClient = Stomp.over(this.socket);

  constructor() {
    Stomp.log = (): void => {};
  }

  /* Connect to the WS server */
  public connectToServer(): void {
    this.stompClient.connect();
  }

  /* Subscribe to a WS topic */
  public subscribe(topic: string, callback: any): any {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      return this.subscribeToTopic(topic, callback);
    }
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

  /* Unsubscribe from a WS topic */
  public unsubscribeFromTopic(subscription: Subscription) {
    subscription.unsubscribe();
  }
}
