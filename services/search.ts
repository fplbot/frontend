import { FPLBOT_API_BASEURL } from "../utils/envconfig";

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

// TODO
export function searchForPlayer(searchString: string): Promise<SearchResponse> {
  const mock: SearchSuccess = {
    type: "SUCCESS",
    data: [{
      id: 1581259,
      entry: 1581259,
      realName: 'Kristiane Westgård',
      teamName: 'Krist10'
    },{
      id: 76744,
      entry: 76744,
      realName: 'Lars Skjelbek',
      teamName: 'bla bla'
    },{
      id: 5357581,
      entry: 5357581,
      realName: 'Magne',
      teamName: 'DJ Premier League'
    },{
      id: 2045419,
      entry: 2045419,
      realName: 'John Korsnes',
      teamName: '✝'
    }],
  };

  return Promise.resolve(mock);

  return fetch(`${FPLBOT_API_BASEURL}/search/${searchString}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((json: PlayerEntry[]): SearchSuccess => {
        return { type: "SUCCESS", data: json };
    })
    .catch((error): SearchError => {
        return { type: "ERROR" };
    });
}
