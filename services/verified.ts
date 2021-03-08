import { FPLBOT_API_BASEURL } from "../utils/envconfig";

export interface VerifiedPLEntry {
  entryId: number;
  slug: string;
  teamName: string;
  realName: string;
  alias: string;
  description: string;
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

export interface VerifiedEntry {
  entryId: number;
  teamName: string;
  realName: string;
  alias: string;
  description: string;
  pointsThisGw: number;
  totalPoints: number;
  overallRank: number;
  captain: string;
  viceCaptain: string;
  chipUsed?: ChipType;
  movement: number;
  gameweek: number;
}

export type ChipType = "3xc" | "wildcard" | "freehit" | "bboost";

interface GetVerifiedPLEntriesSuccess {
  type: "SUCCESS";
  data: VerifiedPLEntry[];
}

export interface GetVerifiedEntriesError {
  type: "ERROR";
}

export type GetVerifiedPLEntriesResponse =
  | GetVerifiedPLEntriesSuccess
  | GetVerifiedEntriesError;

export function getPLVerifiedEntries(): Promise<GetVerifiedPLEntriesResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/virtual-leagues/pl`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(
      (json: VerifiedPLEntry[]): GetVerifiedPLEntriesSuccess => {
        return { type: "SUCCESS", data: json };
      }
    )
    .catch(
      (error): GetVerifiedEntriesError => {
        return { type: "ERROR" };
      }
    );
}

interface GetVerifiedEntriesSuccess {
  type: "SUCCESS";
  data: VerifiedEntry[];
}

export type GetVerifiedEntriesResponse =
  | GetVerifiedEntriesSuccess
  | GetVerifiedEntriesError;

export function getVerifiedEntries(verifiedType: string): Promise<GetVerifiedEntriesResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/virtual-leagues/league?type=${verifiedType}`)
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

interface GetVerifiedPLEntrySuccess {
  type: "SUCCESS";
  data: VerifiedPLEntry;
}

interface GetVerifiedEntryError {
  type: "ERROR";
}

export type GetVerifiedPLEntryResponse =
  | GetVerifiedPLEntrySuccess
  | GetVerifiedEntryError;

export function getVerifiedPLEntry(
  entryId: Number
): Promise<GetVerifiedPLEntryResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/verified/pl/${entryId}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then(
    (json: VerifiedPLEntry): GetVerifiedPLEntrySuccess => {
      return { type: "SUCCESS", data: json };
    }
  )
  .catch(
    (error): GetVerifiedEntryError => {
      return { type: "ERROR" };
    }
  );
}

interface GetVerifiedEntrySuccess {
  type: "SUCCESS";
  data: VerifiedEntry;
}

export type GetVerifiedEntryResponse =
  | GetVerifiedEntrySuccess
  | GetVerifiedEntryError;

export function getVerifiedEntry(
  entryId: Number
): Promise<GetVerifiedEntryResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/verified/${entryId}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then(
    (json: VerifiedPLEntry): GetVerifiedEntrySuccess => {
      return { type: "SUCCESS", data: json };
    }
  )
  .catch(
    (error): GetVerifiedEntryError => {
      return { type: "ERROR" };
    }
  );
}
