import { FPLBOT_API_BASEURL } from "../utils/envconfig";

export interface FplApiResponse {
  hits: {
    count: number;
    exposedHits: PlayerEntry[];
    hitCountExceedingExposedOnes: number;
    totalHits: number;
    page: number;
    totalPages: number;
  };
}

export interface PlayerEntry {
  id: number;
  entry: number;
  realName: string;
  teamName: string;
  verifiedType?: VerifiedType;
}

export type VerifiedType =
  | "FootballerInPL"
  | "Footballer"
  | "ChessMaster"
  | "Podcaster"
  | "CommunityFame"
  | "Actor"
  | "TvFace"
  | "Athlete";

export interface SearchSuccess {
  type: "SUCCESS";
  data: PlayerEntry[];
  hasPrev: boolean;
  hasNext: boolean;
  totalPages: number;
}

interface SearchError {
  type: "ERROR";
}

export type SearchResponse = SearchSuccess | SearchError;

export function searchForPlayer(
  searchString: string,
  page: number
): Promise<SearchResponse> {
  return fetch(
    `${FPLBOT_API_BASEURL}/search/entries/${searchString}?page=${page}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(
      (json: FplApiResponse): SearchSuccess => {
        return {
          type: "SUCCESS",
          data: json.hits.exposedHits,
          hasPrev: json.hits.page > 0,
          hasNext: json.hits.totalPages - 1 > json.hits.page,
          totalPages: json.hits.totalPages,
        };
      }
    )
    .catch(
      (error): SearchError => {
        return { type: "ERROR" };
      }
    );
}
