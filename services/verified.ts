import { FPLBOT_API_BASEURL } from "../utils/envconfig";

export interface FplVerifiedResponse {
    gameweek: number,
    entries: VerifiedLeagueItem[];
}

export interface VerifiedLeagueItem {
    entryId: number,
    teamName: string,
    realName: string,
    plName: string,
    playsForTeam: string,
    shirtImageUrl: string,
    pointsThisGw: number,
    totalPoints: number,
    overallRank: number,
    captain: string,
    viceCaptain: string,
    chipUsed?: ChipType,
    movement: number
}

export type ChipType = 
    | "3xc"
    | "wildcard"
    | "freehit"
    | "bboost";

export function getVerifiedEntries(): Promise<FplVerifiedResponse> {
    return fetch(`${FPLBOT_API_BASEURL}/fpl/verified`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      });
}
  