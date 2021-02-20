import { ChipType } from "../services/verified";

export interface ChipProps {
    chipUsed?: ChipType;
}
export function Chip({chipUsed}: ChipProps) {
    switch (chipUsed) {
        case '3xc':
            return (<span>🚀 Triple Cap</span>);
        case 'wildcard':
            return (<span>🔥 Wildcard</span>);
        case 'freehit':
            return (<span>💥 Free Hit</span>);
        case 'bboost':
            return (<span>👨‍👨‍👦‍👦 Bench Boost</span>)
        default: return null;
    }
}