import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateKill } from 'src/app/models/CreateKill';
import { Game } from 'src/app/models/Game';
import { Player } from 'src/app/models/Player';
import { KillService } from 'src/app/services/kill.service';

@Component({
  selector: 'app-kill-registration',
  templateUrl: './kill-registration.component.html',
  styleUrls: ['./kill-registration.component.scss'],
})
export class KillRegistrationComponent {
  @Output() messageTypeChange = new EventEmitter<string>();
  @Input() game?: Game;
  @Input() player?: Player;

  public messageTyp?: string;

  constructor(private killService: KillService) {}

  public killForm: FormGroup = new FormGroup({
    biteCode: new FormControl('', Validators.required),
    killStory: new FormControl(''),
  });

  get isBiteCodeEmpty(): boolean {
    return !this.killForm.get('biteCode')?.value;
  }

  get isKillStoryEmpty(): boolean {
    return !this.killForm.get('killStory')?.value;
  }

  public onKillSubmit(): void {
    const newKill: CreateKill = {
      time: new Date(Date.now()),
      location: 'some coordinates',
      killerId: this.player?.id || 0,
      biteCode: this.killForm.get('biteCode')?.value,
      story: this.killForm.get('killStory')?.value,
      game: this.game?.id || 0,
    };
    this.killService.registerKill(newKill).subscribe({
      next: () => {
        this.handleSuccess();
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  private handleSuccess(): void {
    this.setMessageType('success');
    this.resetFormAndMessageTypeAfterDelay();
  }

  private handleError(error: any): void {
    this.setMessageType('warning');
    this.resetFormAndMessageTypeAfterDelay();
  }

  private setMessageType(type: string): void {
    this.messageTyp = type;
    this.messageTypeChange.emit(type);
  }

  private resetFormAndMessageTypeAfterDelay(): void {
    this.killForm.reset();
    setTimeout(() => {
      this.messageTyp = undefined;
      this.messageTypeChange.emit(undefined);
    }, 500);
  }
}
