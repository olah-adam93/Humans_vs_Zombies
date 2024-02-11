export interface Game {
  id: number;
  name?: string;
  state?: string;
  date?: string;
  location?: string;
  players?: number[];
  kills?: number[];
  squads?: number[];
  playerIdofCurrentUser?: number;
}
