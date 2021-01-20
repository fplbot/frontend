import { FPLBOT_API_BASEURL } from "../utils/envconfig";

export interface FplApiResponse {
  hits: PlayerEntry[];
}

export interface PlayerEntry {
  id: number;
  entry: number;
  realName: string;
  teamName: string;
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
        return { type: "SUCCESS", data: json.hits };
      }
    )
    .catch(
      (error): SearchError => {
        return { type: "ERROR" };
      }
    );
}
