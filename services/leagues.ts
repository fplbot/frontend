import useSWR from "swr";
import { Bootstrap, Chip, Entry, EntryHistory, LeagueRes, PicksRes, Player, Standings, Transfer, Event } from "./fpl";

interface Init {
  type: "INIT";
}

interface Loading {
  type: "LOADING";
}
interface Error {
  type: "ERROR";
}

export interface EntryTransfer {
  playerIn: Player;
  playerInCost: string;
  playerOut: Player;
  playerOutCost: string;
  time: Date;
}

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  if (response.ok) {
    const body = await response.json();
    return body;
  }
  return Promise.reject({
    status: response.status,
  });
}

export interface CurrentGameweekSummary {
  playerName: string;
  entry: number;
  transfers: EntryTransfer[];
  chip?: Chip;
  captain: string;
  viceCaptain: string;
}

interface CurrentGameweekSummaryData {
  type: "DATA";
  data: CurrentGameweekSummary[];
}

export type CurrentGameweekSummaryState =
  | Loading
  | Error
  | CurrentGameweekSummaryData;

export async function getGameweekSummary(
  id: number,
  listUpdate?: (summaries: CurrentGameweekSummaryState) => void
): Promise<CurrentGameweekSummaryState> {
  const leagueRes = await http<LeagueRes>(`/api/fpl/leagues-classic/${id}/standings/`);
  const entries = leagueRes.standings.results;
  try {
    const bootstrap = await http<Bootstrap>(`/api/fpl/bootstrap-static/`);
    const currentGw = bootstrap.events.filter((e) => e.is_current)[0];

    const currentGameweekSummary: CurrentGameweekSummary[] = [];
    for await (const entry of entries) {
      try {
        const summary = await summaryForEntry(entry, currentGw, bootstrap);

        currentGameweekSummary.push(summary);
        if (listUpdate)
          listUpdate({
            type: "DATA",
            data: currentGameweekSummary,
          });
      } catch {
        if (listUpdate)
          listUpdate({
            type: "ERROR"
          });
        return {
          type: "ERROR"
        };
      }
    }

    return {
      type: "DATA",
      data: currentGameweekSummary,
    };
  } catch (e) {
    return {
      type: "ERROR",
    };
  }
}

async function summaryForEntry(entry: Entry, currentGw: Event, bootstrap: Bootstrap)
  : Promise<CurrentGameweekSummary> {

  const transfers = await http<Transfer[]>(
    `/api/fpl/entry/${entry.entry}/transfers`
  );

  const history = await http<EntryHistory>(
    `/api/fpl/entry/${entry.entry}/history`
  );
  const chipForCurrentGw = history.chips.filter(
    (c) => c.event == currentGw.id
  )[0];

  const picks = await http<PicksRes>(
    `/api/fpl/entry/${entry.entry}/event/${currentGw.id}/picks`
  );
  const captainPick = picks.picks.filter(p => p.is_captain)[0];
  const captainPlayer = bootstrap.elements.filter(
    (e) => e.id === captainPick.element
  )[0];

  const viceCaptainPick = picks.picks.filter(p => p.is_vice_captain)[0];
  const viceCaptainPlayer = bootstrap.elements.filter(
    (e) => e.id === viceCaptainPick.element
  )[0];

  const transfersForCurrentGw = transfers
    .filter((t) => t.event === currentGw.id)
    .map((t) => {
      const playerIn = bootstrap.elements.filter(
        (e) => e.id === t.element_in
      )[0];
      const playerOut = bootstrap.elements.filter(
        (e) => e.id === t.element_out
      )[0];

      return {
        playerIn: playerIn,
        playerOut: playerOut,
        playerInCost: `£${t.element_in_cost / 10}`,
        playerOutCost: `£${t.element_out_cost / 10}`,
        time: t.time,
      };
    });

  return {
    playerName: entry.player_name,
    entry: entry.entry,
    transfers: transfersForCurrentGw,
    chip: chipForCurrentGw,
    captain: captainPlayer.web_name,
    viceCaptain: viceCaptainPlayer.web_name
  }
}

interface StandingsData {
  type: "DATA";
  data: LeagueRes;
}

export type StandingsLeagueResult = Loading | Error | StandingsData;

interface StandingsLeagueState {
  standingsState: StandingsLeagueResult;
}

export function useLeagueStandings(id: number): StandingsLeagueState {
  const { data, error } = useSWR<LeagueRes>(
    `/api/fpl/leagues-classic/${id}/standings/`,
    http
  );

  if (data && !error) {
    return {
      standingsState: {
        type: "DATA",
        data: data,
      },
    };
  }

  if (!data && !error) {
    return {
      standingsState: {
        type: "LOADING",
      },
    };
  }
  return {
    standingsState: {
      type: "ERROR",
    },
  };
}
