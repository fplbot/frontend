export interface LeagueRes {
  league: League;
  standings: Standings;
}

export interface League {
  id: number;
  name: string;
}

export interface Entry {
  entry: number;
  player_name: string;
  rank: number;
  total: number;
}

export interface Standings {
  results: Entry[];
}

export interface Transfer {
  element_in: number;
  element_in_cost: number;
  element_out: number;
  element_out_cost: number;
  event: number;
  time: Date;
}

export interface Bootstrap {
  elements: Player[];
  events: Event[];
}

export interface Player {
  id: number;
  web_name: string;
  code: string;
}

export interface Event {
  id: number;
  is_current: boolean;
}

export interface EntryHistory {
  chips: Chip[];
}

export type ChipType = "3xc" | "wildcard" | "freehit" | "bboost";

export interface Chip {
  name: ChipType;
  time: Date;
  event: number;
}

export interface Pick {
  element: number;
  is_captain: boolean;
  is_vice_captain: boolean;
}

export interface EntryHistory {
  chips: Chip[];
}

export interface PicksRes {
  picks: Pick[];
}

