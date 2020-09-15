interface RedirectUriJson {
  redirectUri: string;
}

interface RedirectUriError {
  type: 'ERROR';
  reason: string;
}

interface RedirectUriSuccess {
  type: 'SUCCESS'
  redirectUri: string;
}

type RedirectUriResponse = RedirectUriError | RedirectUriSuccess;

export function getRedirectUri(channel: string, leagueId: string): Promise<RedirectUriResponse> {
  return fetch(`https://api.fplbot.app/oauth/install-url?channel=${channel}&leagueId=${leagueId}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  })
    .then(response => {
      console.log(response);
      
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((json: RedirectUriJson): RedirectUriSuccess  => {
      return { type: 'SUCCESS', redirectUri: json.redirectUri };
    })
    .catch((error): RedirectUriError => {
      return { type: 'ERROR', reason: error.leagueId };
    });
}