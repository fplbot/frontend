import { FPLBOT_API_BASEURL } from "../utils/envconfig";

interface RedirectUriJson {
  redirectUri: string;
}

interface RedirectUriError {
  type: 'ERROR';
  reason?: {};
}

interface RedirectUriSuccess {
  type: 'SUCCESS'
  redirectUri: string;
}

type RedirectUriResponse = RedirectUriError | RedirectUriSuccess;

export function getRedirectUri(channel: string, leagueId: number): Promise<RedirectUriResponse> {
  const channelWithPrefix = channel.includes("#") ? channel : `#${channel}`

  return fetch(`${FPLBOT_API_BASEURL}/oauth/install-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: channelWithPrefix,
      leagueId: leagueId
    })
  })
    .then(async response => {
      const json = await response.json();
      if (response.ok) {
        return json;
      }
      return Promise.reject(json);
    })
    .then((json: RedirectUriJson): RedirectUriSuccess => {
      return { type: 'SUCCESS', redirectUri: json.redirectUri };
    })
    .catch((error): RedirectUriError => {
      return { type: 'ERROR', reason: error.errors };
    });
}

interface LeagueIdJson {
  leagueName: string;
  leagueAdmin: string;
}

interface LeagueIdNotFound {
  type: 'NOT_FOUND';
}

interface LeagueIdSuccess {
  type: 'SUCCESS'
  leagueName: string;
  leagueAdmin: string;
}

type LeagueIdResponse = LeagueIdNotFound | LeagueIdSuccess;

export function validateLeagueId(leagueId: string): Promise<LeagueIdResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/fpl/leagues/${leagueId}`, {
    method: 'GET',
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((json: LeagueIdJson): LeagueIdSuccess => {
      return { type: 'SUCCESS', leagueName: json.leagueName, leagueAdmin: json.leagueAdmin };
    })
    .catch((error): LeagueIdNotFound => {
      return { type: 'NOT_FOUND' };
    });
}