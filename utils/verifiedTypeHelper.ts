import { VerifiedType } from "../services/VerifiedType";

export interface VerifiedTypeExtra {
  title: string;
  description: string;
}

export function getVerifiedExtraInformation(
  verifiedType: VerifiedType
): VerifiedTypeExtra {
  switch (verifiedType) {
    case "FootballerInPL":
      return {
        title: "Premier League Players",
        description: "All verified Premier League Players",
      };
    case "Footballer":
      return {
        title: "Football players",
        description: "All verified football players",
      };
    case "ChessMaster":
      return {
        title: "Chess players",
        description: "Aka the Magnus Carlsen league",
      };
    case "Podcaster":
      return {
        title: "Podcasters",
        description: "Famous podcasters",
      };
    case "CommunityFame":
      return {
        title: "FPL community",
        description: "Relevant people from the fpl-community and twitter",
      };
    case "Actor":
      return { title: "Actors", description: "Famous actors" };
    case "TvFace":
      return {
        title: "People from TV",
        description: "People seen on TV",
      };
    case "Athlete":
      return {
        title: "Athletes",
        description: "Famous athletes",
      };
    default:
      return {
        title: "Unknown",
        description: "Unknown",
      };
  }
}
