export function getEntryUrl(entryId: number, gameWeek: number) {
    return gameWeek > 0 ? 
    `https://fantasy.premierleague.com/entry/${entryId}/event/${gameWeek}` :
    `https://fantasy.premierleague.com/entry/${entryId}/history`;
}