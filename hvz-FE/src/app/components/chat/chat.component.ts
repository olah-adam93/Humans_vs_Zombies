import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { CreateChat } from '../../models/CreateChat';
import { ChatService } from '../../services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
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
  public firstLoad = true;
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
    if (this.game || this.player) {
      this.loadChats();
      this.subscribeToChatUpdates();
    }
  }

  isMsgEmpty(chatType: 'global' | 'human' | 'zombie'): boolean {
    switch (chatType) {
      case 'global':
        return !this.globalChatForm.get('globalChatMessage')?.value;
      case 'human':
        return !this.humanChatForm.get('humanChatMessage')?.value;
      case 'zombie':
        return !this.zombieChatForm.get('zombieChatMessage')?.value;
    }
  }

  public sendChat(faction: string): void {
    const newChat: CreateChat = {
      message: '',
      faction,
      player: this.player?.id,
      game: this.game?.id,
      userName: this.keycloakService.getUsername() || '',
    };

    switch (faction) {
      case 'global':
        newChat.message = this.globalChatForm.get('globalChatMessage')?.value;
        break;
      case 'human':
        newChat.message = this.humanChatForm.get('humanChatMessage')?.value;
        break;
      case 'zombie':
        newChat.message = this.zombieChatForm.get('zombieChatMessage')?.value;
        break;
      default:
        break;
    }

    console.log(newChat);

    this.chatService.sendChat(newChat).subscribe({
      next: () => {
        console.log(
          `Chat sent to ${newChat.faction} faction by ${newChat.userName}`
        );
        this.resetChatForms();
      },
      error: (e) => {
        console.error('Error sending chat:', e);
      },
    });
  }

  private loadGlobalChat(): void {
    this.chatService.getGlobalChatByGame(this.game?.id || 0).subscribe({
      next: (globalChat) => {
        this.globalChat = globalChat;
      },
      error: (e) => {
        console.error('Error loading global chat:', e);
      },
    });
  }

  private loadHumanChat(): void {
    if (this.player?.isHuman) {
      this.chatService.getHumanChatByGame(this.game?.id || 0).subscribe({
        next: (humanChat) => {
          this.humanChat = humanChat;
        },
        error: (e) => {
          console.error('Error loading human chat:', e);
        },
      });
    } else {
      console.error('Player is not human.');
    }
  }

  private loadZombieChat(): void {
    if (!this.player?.isHuman) {
      this.chatService.getZombieChatByGame(this.game?.id || 0).subscribe({
        next: (zombieChat) => {
          this.zombieChat = zombieChat;
        },
        error: (e) => {
          console.error('Error loading zombie chat:', e);
        },
      });
    } else {
      console.error('Player is not a zombie.');
    }
  }

  private loadChats(): void {
    this.loadGlobalChat();
    this.loadHumanChat();
    this.loadZombieChat();
  }

  private subscribeToChatUpdates(): void {
    if (this.firstLoad) {
      setTimeout(() => {
        this.wsChatSubscription = this.stompService.subscribe(
          `/topic/chat/${this.game?.id}`,
          (response: any): void => {
            console.log('Notification received');
            console.log(response.body);

            switch (response.body) {
              case 'global':
                this.refreshGlobalChat();
                break;
              case 'human':
                this.refreshHumanChat();
                break;
              case 'zombie':
                this.refreshZombieChat();
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

  private resetChatForms(): void {
    this.globalChatForm.reset();
    this.humanChatForm.reset();
    this.zombieChatForm.reset();
  }

  private refreshGlobalChat(): void {
    if (this.game) {
      this.chatService.getGlobalChatByGame(this.game.id).subscribe({
        next: (globalChat) => {
          this.globalChat = globalChat;
        },
        error: (e) => {
          console.error('Error refreshing global chat:', e);
        },
      });
    }
  }

  private refreshHumanChat(): void {
    if (this.game) {
      this.chatService.getHumanChatByGame(this.game.id).subscribe({
        next: (humanChat) => {
          this.humanChat = humanChat;
        },
        error: (e) => {
          console.error('Error refreshing human chat:', e);
        },
      });
    }
  }

  private refreshZombieChat(): void {
    if (this.game) {
      this.chatService.getZombieChatByGame(this.game?.id).subscribe({
        next: (zombieChat) => {
          this.zombieChat = zombieChat;
        },
        error: (e) => {
          console.error('Error refreshing zombie chat:', e);
        },
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.wsChatSubscription) {
      this.stompService.unsubscribeFromTopic(this.wsChatSubscription);
    }
  }
}
