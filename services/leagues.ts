type League = {
  id: number;
  name: string;
}

type Entry = {
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
  element_out: number;
  event: number;
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
  entry: Entry;
  playerIn: Player;
  playerOut: Player;
}

export type LeagueResError = {
  status: number;
}

async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  if (response.ok) {
    const body = await response.json();
    return body;
  }
  return Promise.reject({
    status: response.status
  });
}

export async function getTransfersForEntries(entries: Entry[]): Promise<EntryTransfer[]> {
  const bootstrap = await http<Bootstrap>(`/api/fpl/bootstrap-static/`);
  let newTransfers: EntryTransfer[] = [];

  for await (const item of entries) {
    const transfers = await http<Transfer[]>(`/api/fpl/entry/${item.entry}/transfers`);
    const currentGw = bootstrap.events.filter(e => e.is_current)[0];
    const transfersForCurrentGw = transfers.filter(t => t.event === currentGw.id);
    const playerTransfersForCurrentGw = transfersForCurrentGw.map<EntryTransfer>(t => {
      const playerIn = bootstrap.elements.filter(e => e.id === t.element_in)[0];
      const playerOut = bootstrap.elements.filter(e => e.id === t.element_out)[0];
      const entry = entries.filter(e => e.entry == item.entry)[0];
      return {
        entry: entry,
        playerIn: playerIn,
        playerOut: playerOut
      }
    });

    newTransfers = newTransfers.concat(playerTransfersForCurrentGw);
  }

  return newTransfers;
}
