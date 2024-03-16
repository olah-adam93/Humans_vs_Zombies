import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { CreateChat } from '../../models/CreateChat';
import { ChatService } from '../../services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { StompService } from '../../services/stomp.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges, OnDestroy {
  @Input() public game?: Game;
  @Input() public player?: Player;
  public globalChat: CreateChat[] = [];
  public humanChat: CreateChat[] = [];
  public zombieChat: CreateChat[] = [];
  public firstLoad: boolean = true;
  public wsChatSubscription?: any;

  public globalChatForm: FormGroup = new FormGroup({
    globalChatMessage: new FormControl('', Validators.required),
  });

  public humanChatForm: FormGroup = new FormGroup({
    humanChatMessage: new FormControl('', Validators.required),
  });

  public zombieChatForm: FormGroup = new FormGroup({
    zombieChatMessage: new FormControl('', Validators.required),
  });

  constructor(
    private chatService: ChatService,
    private keycloakService: KeycloakService,
    private stompService: StompService
  ) {}

  ngOnChanges(): void {
    if (this.game && this.player) {
      console.log('chat component onchanges');

      //load global chat
      this.chatService.getGlobalChatByGame(this.game.id).subscribe({
        next: (globalChat) => {
          this.globalChat = globalChat;
          console.log(this.globalChat);
        },
        error: (e) => {
          console.log(e);
        },
      });

      if (this.player.isHuman) {
        this.chatService.getHumanChatByGame(this.game.id).subscribe({
          next: (humanChat) => {
            this.humanChat = humanChat;
          },
          error: (e) => {
            console.log(e);
          },
        });
      }

      if (!this.player.isHuman) {
        this.chatService.getZombieChatByGame(this.game.id).subscribe({
          next: (zombieChat) => {
            this.zombieChat = zombieChat;
          },
          error: (e) => {
            console.log(e);
          },
        });
      }

      if (this.firstLoad) {
        setTimeout(() => {
          //websocket subscription to Chat updates
          this.wsChatSubscription = this.stompService.subscribe(
            `/topic/chat/${this.game?.id}`,
            (response: any): void => {
              console.log('notified');
              console.log(response.body);

              if (response.body == 'global') {
                this.refreshGlobalChat();
              }

              if (response.body == 'human') {
                this.refreshHumanChat();
              }

              if (response.body == 'zombie') {
                this.refreshZombieChat();
              }
            }
          );
        }, 1000);
      }

      this.firstLoad = false;
    }
  } //end OnChanges

  public sendChat(faction: string): void {
    let newChat: CreateChat = {
      message: 'placeholder',
      faction: faction,
      player: this.player?.id,
      game: this.game?.id,
      userName: this.keycloakService.username,
    };

    if (faction === 'global') {
      newChat.message = this.globalChatForm.get('globalChatMessage')?.value;
    } else if (faction === 'human') {
      newChat.message = this.humanChatForm.get('humanChatMessage')?.value;
    } else if (faction === 'zombie') {
      newChat.message = this.zombieChatForm.get('zombieChatMessage')?.value;
    }

    console.log(newChat);

    this.chatService.sendChat(newChat).subscribe({
      next: () => {
        console.log(
          `Chat sent to ${newChat.faction} faction by ${newChat.userName}`
        );
        this.globalChatForm.reset();
        this.humanChatForm.reset();
        this.zombieChatForm.reset();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public refreshGlobalChat() {
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

  public refreshHumanChat() {
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

  public refreshZombieChat() {
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
