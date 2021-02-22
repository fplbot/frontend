import { ChipType } from "../services/verified";

export interface ChipProps {
  chipUsed: ChipType;
  short?: boolean;
}
export function Chip({ chipUsed, short }: ChipProps): JSX.Element {
  switch (chipUsed) {
    case "3xc":
      return <span>🚀 {short ? "TC" : "Triple captain"}</span>;
    case "wildcard":
      return <span>🔥 {short ? "WC" : "Wildcard"}</span>;
    case "freehit":
      return <span>💥 {short ? "FH" : "Free hit"}</span>;
    case "bboost":
      return <span>👨‍👨‍👦‍👦 {short ? "BB" : "Bench boost"}</span>;
  }
}
