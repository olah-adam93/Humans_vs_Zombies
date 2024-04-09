import { Component, OnInit } from '@angular/core';
import { StompService } from './services/stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private stompService: StompService) {}
  ngOnInit(): void {
    this.stompService.connectToServer();
  }
}
