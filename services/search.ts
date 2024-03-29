import { FPLBOT_API_BASEURL } from "../utils/envconfig";
import { VerifiedType } from "./VerifiedType";

export interface FplApiResponse {
  hits: {
    count: number;
    exposedHits: Source[];
    hitCountExceedingExposedOnes: number;
    totalHits: number;
    page: number;
    totalPages: number;
  };
}

export interface PlayerEntry  {
  id: number;
  realName: string;
  teamName: string;
  verifiedType?: VerifiedType;
  alias: string;
  description: string;
}

export interface LeagueEntry  {
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

export type Source = PlayerSource | LeagueSource;

export interface SearchSuccess {
  type: "SUCCESS";
  data: Source[];
  hasPrev: boolean;
  hasNext: boolean;
  totalPages: number;
}

interface SearchError {
  type: "ERROR";
}

export type SearchResponse = SearchSuccess | SearchError;
export type SearchType = 'all' | 'entries' | 'leagues';

export function search(
  searchString: string,
  page: number,
  searchType: SearchType
): Promise<SearchResponse> {
  return fetch(
    `${FPLBOT_API_BASEURL}/search/any?query=${searchString}&page=${page}&type=${searchType}`,
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

