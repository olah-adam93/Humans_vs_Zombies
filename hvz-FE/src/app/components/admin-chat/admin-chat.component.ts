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
export class AdminChatComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public game?: Game;
  public globalChat: CreateChat[] = [];
  public humanChat: CreateChat[] = [];
  public zombieChat: CreateChat[] = [];
  public firstLoad: boolean = true;
  public wsChatSubscription?: any;

  constructor(
    private chatService: ChatService,
    private stompService: StompService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.game) {
      //load global chat
      this.loadGlobalChat();
      this.loadHumanChat();
      this.loadZombieChat();

      if (this.firstLoad) {
        setTimeout(() => {
          //websocket subscription to Chat updates
          this.wsChatSubscription = this.stompService.subscribe(
            `/topic/chat/${this.game?.id}`,
            (response: any): void => {
              console.log('notified');
              console.log(response.body);

              if (response.body == 'global') {
                this.loadGlobalChat();
              }

              if (response.body == 'human') {
                this.loadHumanChat();
              }

              if (response.body == 'zombie') {
                this.loadZombieChat();
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
          console.log(e);
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
          console.log(e);
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
          console.log(e);
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
