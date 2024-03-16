import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { CreateChat } from '../../models/CreateChat';
import { ChatService } from '../../services/chat.service';
import { StompService } from '../../services/stomp.service';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss'],
})
export class AdminChatComponent implements OnChanges, OnDestroy {
  @Input() public game?: Game;
  public globalChat: CreateChat[] = [];
  public humanChat: CreateChat[] = [];
  public zombieChat: CreateChat[] = [];
  public firstLoad = true;
  public wsChatSubscription?: any;

  constructor(
    private chatService: ChatService,
    private stompService: StompService
  ) {}

  ngOnChanges(): void {
    if (this.game) {
      // Load chats
      this.loadGlobalChat();
      this.loadHumanChat();
      this.loadZombieChat();

      if (this.firstLoad) {
        setTimeout(() => {
          // Websocket subscription to chat updates
          this.wsChatSubscription = this.stompService.subscribe(
            `/topic/chat/${this.game?.id}`,
            (response: any): void => {
              console.log('Notification received');
              console.log(response.body);

              switch (response.body) {
                case 'global':
                  this.loadGlobalChat();
                  break;
                case 'human':
                  this.loadHumanChat();
                  break;
                case 'zombie':
                  this.loadZombieChat();
                  break;
                default:
                  break;
              }
            }
          );
        }, 1000);
      }

      this.firstLoad = false;
    }
  }

  public loadGlobalChat() {
    if (this.game) {
      this.chatService.getGlobalChatByGame(this.game.id).subscribe({
        next: (globalChat) => {
          this.globalChat = globalChat;
        },
        error: (e) => {
          console.error('Error loading global chat:', e);
        },
      });
    }
  }

  public loadHumanChat() {
    if (this.game) {
      this.chatService.getHumanChatByGame(this.game.id).subscribe({
        next: (humanChat) => {
          this.humanChat = humanChat;
        },
        error: (e) => {
          console.error('Error loading human chat:', e);
        },
      });
    }
  }

  public loadZombieChat() {
    if (this.game) {
      this.chatService.getZombieChatByGame(this.game.id).subscribe({
        next: (zombieChat) => {
          this.zombieChat = zombieChat;
        },
        error: (e) => {
          console.error('Error loading zombie chat:', e);
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.wsChatSubscription) {
      this.stompService.unsubscribeFromTopic(this.wsChatSubscription);
    }
  }
}
