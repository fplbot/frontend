import { FPLBOT_API_BASEURL } from "../utils/envconfig";

interface SuggestionNotSuccessful {
  type: 'ERR';
}

interface SuggestResponseSuccess {
  type: 'SUCCESS'
}

export type SuggestionResponse = SuggestionNotSuccessful | SuggestResponseSuccess;

export function suggestEntry(entryId: number, description: string, pl_playerId?: number): Promise<SuggestionResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/suggestions/verified/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        entryId: entryId,
        description: description,
        playerId: pl_playerId
      })
    })  
    .then((): SuggestResponseSuccess => {
      return { type: 'SUCCESS' };
    })
    .catch((error): SuggestionNotSuccessful => {
      return { type: 'ERR' };
    });
}