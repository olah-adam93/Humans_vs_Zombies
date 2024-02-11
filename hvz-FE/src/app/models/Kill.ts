export interface Kill {
  id: string;
  time?: string;
  story?: string;
  latitude?: number;
  longitude?: number | null;
  killerId?: string;
  victimId?: string;
}
