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

export type ChipType = "3xc" | "wildcard" | "freehit" | "bboost";

interface GetVerifiedEntriesSuccess {
  type: "SUCCESS";
  data: VerifiedEntry[];
}

interface GetVerifiedEntriesError {
  type: "ERROR";
}

export type GetVerifiedEntriesResponse =
  | GetVerifiedEntriesSuccess
  | GetVerifiedEntriesError;

export function getVerifiedEntries(): Promise<GetVerifiedEntriesResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/fpl/v2/pl-verified`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(
      (json: VerifiedEntry[]): GetVerifiedEntriesSuccess => {
        return { type: "SUCCESS", data: json };
      }
    )
    .catch(
      (error): GetVerifiedEntriesError => {
        return { type: "ERROR" };
      }
    );
}

interface GetVerifiedEntrySuccess {
  type: "SUCCESS";
  data: VerifiedEntry;
}

interface GetVerifiedEntryError {
  type: "ERROR";
}

export type GetVerifiedEntryResponse =
  | GetVerifiedEntrySuccess
  | GetVerifiedEntryError;

export function getVerifiedEntry(
  entryId: Number
): Promise<GetVerifiedEntryResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/fpl/v2/pl-verified/${entryId}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then(
    (json: VerifiedEntry): GetVerifiedEntrySuccess => {
      return { type: "SUCCESS", data: json };
    }
  )
  .catch(
    (error): GetVerifiedEntryError => {
      return { type: "ERROR" };
    }
  );
}
