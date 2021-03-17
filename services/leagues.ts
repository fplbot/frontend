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
  playerIn: Player;
  playerOut: Player;
}

export type LeagueResError = {
  status: number;
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

export async function getTransfersForEntries(entries: Entry[]): Promise<Map<string, EntryTransfer[]>> {
  const bootstrap = await http<Bootstrap>(`/api/fpl/bootstrap-static/`);
  let entryTransfersMap = new Map<string, EntryTransfer[]>();

  for(const inject of entries){
      entryTransfersMap.set(inject.player_name, []);
  }

  for await (const entry of entries) {
    const transfers = await http<Transfer[]>(`/api/fpl/entry/${entry.entry}/transfers`);
    const currentGw = bootstrap.events.filter(e => e.is_current)[0];
    const transfersForCurrentGw = transfers.filter(t => t.event === currentGw.id);

    transfersForCurrentGw.forEach(t => {
      const playerIn = bootstrap.elements.filter(e => e.id === t.element_in)[0];
      const playerOut = bootstrap.elements.filter(e => e.id === t.element_out)[0];
      var entryTransfers = transfersForCurrentGw.map(t => { return { playerIn: playerIn, playerOut: playerOut } });
      let existingTransfers = entryTransfersMap.get(entry.player_name);
      if(existingTransfers){
        existingTransfers.push({ playerIn: playerIn, playerOut: playerOut});
        entryTransfersMap.set(entry.player_name, existingTransfers);
      }
      else{
        entryTransfersMap.set(entry.player_name, entryTransfers);
      } 
    });
  }

  return entryTransfersMap;
}
