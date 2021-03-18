type League = {
  id: number;
  name: string;
}

export type Entry = {
  entry: number;
  player_name: string;
  rank: number;
  total: number;
}

type Standings = {
  results: Entry[];
}

export type LeagueRes = {
  league: League;
  standings: Standings;
}

type Transfer = {
  element_in: number;
  element_in_cost: number;
  element_out: number;
  element_out_cost: number;
  event: number;
  time: Date;
}

type Bootstrap = {
  elements: Player[];
  events: Event[];
}

type Player = {
  id: number;
  web_name: string;
}

type Event = {
  id: number;
  is_current: boolean;
}

export type EntryTransfer = {
  playerIn: Player;
  playerInCost: string;
  playerOut: Player;
  playerOutCost: string;
  time: Date;
}

export type LeagueResError = {
  status: number;
}

type EntryHistory = {
  chips: Chip[];
}

type Chip = {
  name: string;
  time: Date,
  event: number
}

type PicksRes = {
  picks: Pick[]
}

type Pick = {
  element: number,
  is_captain: boolean
}

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  if (response.ok) {
    const body = await response.json();
    return body;
  }
  return Promise.reject({
    status: response.status
  });
}

export type CurrentGameweekSummary = {
  transfers: EntryTransfer[]
  chips: Chip[],
  captain: Player
}

export async function getTransfersForEntries(entries: Entry[]): Promise<Map<string, CurrentGameweekSummary>> {
  const bootstrap = await http<Bootstrap>(`/api/fpl/bootstrap-static`);
  const currentGw = bootstrap.events.filter(e => e.is_current)[0];

  let entryTransfersMap = new Map<string, CurrentGameweekSummary>();

  for await (const entry of entries) {
    const transfers = await http<Transfer[]>(`/api/fpl/entry/${entry.entry}/transfers`);
    const transfersForCurrentGw = transfers.filter(t => t.event === currentGw.id);
    const history = await http<EntryHistory>(`/api/fpl/entry/${entry.entry}/history`);
    const chipsForCurrentGw = history.chips.filter(c => c.event == currentGw.id);
    const picks = await http<PicksRes>(`/api/fpl/entry/${entry.entry}/event/${currentGw.id}/picks`);
    const captainEl = picks.picks.filter(p => p.is_captain)[0];
    const captainPlayer = bootstrap.elements.filter(e => e.id === captainEl.element)[0]

    entryTransfersMap.set(entry.player_name, {
      transfers: [],
      chips: chipsForCurrentGw,
      captain: captainPlayer
    });

    transfersForCurrentGw.forEach(t => {
      const playerIn = bootstrap.elements.filter(e => e.id === t.element_in)[0];
      const playerOut = bootstrap.elements.filter(e => e.id === t.element_out)[0];
      let summary = entryTransfersMap.get(entry.player_name);
      if (summary && summary.transfers) {
        summary.transfers.push({
          playerIn: playerIn,
          playerInCost: `${t.element_in_cost / 10}£`,
          playerOut: playerOut,
          playerOutCost: `${t.element_out_cost / 10}£`,
          time: t.time
        });
        entryTransfersMap.set(entry.player_name, summary);
      }
    });
  }

  return entryTransfersMap;
}
