
export type VerifiedType = "Unknown" |
  "FootballerInPL" |
  "Footballer" |
  "ChessMaster" |
  "Podcaster" |
  "CommunityFame" |
  "Actor" |
  "TvFace" |
  "Athlete" |
  "PastWinner";

export const toVerifiedType = (verifiedType: string): VerifiedType | null  => {
  switch (verifiedType.toLowerCase()) {
    case 'footballerinpl':
      return "FootballerInPL";
    case 'footballer':
      return "Footballer";
    case 'chessmaster':
      return "ChessMaster";
    case 'podcaster':
      return "Podcaster";
    case 'communityfame':
      return "CommunityFame";
    case 'actor':
      return "Actor";
    case 'tvface':
      return "TvFace";
    case 'athlete':
      return "Athlete";
    case 'pastwinner':
      return "PastWinner";
    case 'unknown':
      return 'Unknown'
    default:
      return null;
  };
};
