import { FPLBOT_API_BASEURL } from "../utils/envconfig";
import { VerifiedType } from "./VerifiedType";

export interface FplApiResponse {
  hits: {
    count: number;
    exposedHits: (PlayerEntry|LeagueEntry)[];
    hitCountExceedingExposedOnes: number;
    totalHits: number;
    page: number;
    totalPages: number;
  };
}

export interface PlayerEntry  {
  type: "entry";
  id: number;
  realName: string;
  teamName: string;
  verifiedType?: VerifiedType;
  alias: string;
  description: string;
}

export interface LeagueEntry  {
  type: "league";
  id: number;
  name: string;
  adminEntry: number;
  adminName: string;
  adminTeamName: string;
  adminCountry: string;
}

export type PlayerSource = {
  type : "entry";
  source : PlayerEntry;
}

export type LeagueSource = {
  type : "league";
  source : LeagueEntry;
}


export interface SearchSuccess {
  type: "SUCCESS";
  data: (PlayerSource|LeagueSource)[];
  hasPrev: boolean;
  hasNext: boolean;
  totalPages: number;
}

interface SearchError {
  type: "ERROR";
}

export type SearchResponse = SearchSuccess | SearchError;

export function searchAny(
  searchString: string,
  page: number
): Promise<SearchResponse> {
  return fetch(
    `${FPLBOT_API_BASEURL}/search/any?query=${searchString}&page=${page}`,
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
        console.log(json);
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

