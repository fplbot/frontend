import { FPLBOT_API_BASEURL } from "../utils/envconfig";

export interface VerifiedEntry {
  entryId: number;
  slug: string;
  teamName: string;
  realName: string;
  plName: string;
  playsForTeam: string;
  shirtImageUrl: string;
  imageUrl: string;
  pointsThisGw: number;
  totalPoints: number;
  overallRank: number;
  captain: string;
  viceCaptain: string;
  chipUsed?: ChipType;
  movement: number;
  selfOwnershipWeekCount: number;
  selfOwnershipTotalPoints: number;
  gameweek: number;
}

export type ChipType = 
    | "3xc"
    | "wildcard"
    | "freehit"
    | "bboost";

export function getVerifiedEntries(): Promise<VerifiedEntry[]> {
    return fetch(`${FPLBOT_API_BASEURL}/fpl/verified`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      });
}

export function getVerifiedEntry(slug: string): Promise<VerifiedEntry> {
  return fetch(`${FPLBOT_API_BASEURL}/fpl/verified/${slug}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    });
}
  