export interface Player {
  id?: number;
  username?: string;
  isHuman: boolean;
  isPatientZero?: boolean;
  state?: string;
  biteCode?: string;
  game?: number;
  loginUser?: number;
  keycloakId?: string;
}
