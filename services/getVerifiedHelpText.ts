import { VerifiedType } from "./VerifiedType";

export const getVerifiedHelpText = (verifiedType: VerifiedType): string => {
  switch (verifiedType) {
    case 'FootballerInPL':
      return "That guy in Premier League";
    case 'Footballer':
      return "That famous football player";
    case 'ChessMaster':
      return "That chess champion";
    case 'Podcaster':
      return "That voice on the podcast thing";
    case 'CommunityFame':
      return "That person on Twitter";
    case 'Actor':
      return "That actor";
    case 'TvFace':
      return "That TV face";
    case 'Athlete':
      return "That famous athlete";
    case 'Unknown':
      return "Not sure who this is";
  }
};