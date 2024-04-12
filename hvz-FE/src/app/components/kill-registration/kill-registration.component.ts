import { Component, Input, Output } from '@angular/core';
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
        console.log('kill registered');
        this.messageTyp = 'success';
        this.killForm.reset();
        setTimeout(() => {
          this.messageTyp = undefined;
        }, 5000);
      },
      error: (e) => {
        console.log(e);
        this.messageTyp = 'warning';
        this.killForm.reset();
        setTimeout(() => {
          this.messageTyp = undefined;
        }, 5000);
      },
    });
  }
}
