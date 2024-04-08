import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-player-chart',
  templateUrl: './player-chart.component.html',
  styleUrls: ['./player-chart.component.scss'],
})
export class PlayerChartComponent {
  @Input() players?: Player[];
  @Input() humans?: Player[];
  @Input() zombies?: Player[];
  public selectedTab: string = 'global';
}
