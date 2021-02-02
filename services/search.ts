import { FPLBOT_API_BASEURL } from "../utils/envconfig";

export interface FplApiResponse {
  hits: {
    count: number;
    exposedHits: PlayerEntry[];
    hitCountExceedingExposedOnes: number;
    totalHits: number;
  };
}

export interface PlayerEntry {
  id: number;
  entry: number;
  realName: string;
  teamName: string;
  verifiedType?: VerifiedType;
}

export enum VerifiedType {
  FootballerInPL = 0,
  Footballer = 1,
  ChessMaster = 2,
  Podcaster = 3,
  CommunityFame = 4,
  Actor = 5,
  TvFace = 6,
  Athlete = 7
}

interface SearchSuccess {
  type: "SUCCESS";
  data: PlayerEntry[];
}

interface SearchError {
  type: "ERROR";
}

export type SearchResponse = SearchSuccess | SearchError;

export function searchForPlayer(searchString: string): Promise<SearchResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/search/entries/${searchString}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(
      (json: FplApiResponse): SearchSuccess => {
        return { type: "SUCCESS", data: json.hits.exposedHits };
      }
    )
    .catch(
      (error): SearchError => {
        return { type: "ERROR" };
      }
    );
}
