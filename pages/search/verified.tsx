import { abbreviate } from "@pqt/abbreviate";
import Head from "next/head";
import Link from 'next/link';
import React from "react";
import { Chip } from "../../components/Chip";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/SimpleHeader";
import { getVerifiedEntries, VerifiedEntry } from "../../services/verified";
import { formatNumber } from "../../utils/formatter";

function VerifiedIndex({verifiedEntries}: {verifiedEntries: VerifiedEntry[] }) {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
            <Head>
                <title>Premier League players in FPL</title>
                <meta
                    name="description"
                    content="Premier League players in FPL"
                />
            </Head>
            <SimpleHeader />
            <div className="flex-grow">
                <div className="py-24 px-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
                        The Premier FPL League <img src="/check.svg" className="verified-icon" alt="Verified"/>
                    </h1>
                    <p className="text-md md:text-lg text-center text-fpl-purple">
                        This virtual league consists of Premier League players with verified Fantasy Premier League teams.
                    </p>
                </div>
            </div>
            <div className="w-full max-w-7xl m-auto mb-20">
                <table className="w-full flex flex-row flex-no-wrap rounded overflow-hidden sm:shadow-lg my-5">
                    <thead className="text-white">
                        <tr className="bg-fpl-purple flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Player</th>
                            <th className="p-3 text-left">Team&nbsp;name</th>
                            <th className="p-3 text-right">GW&nbsp;pts</th>
                            <th className="p-3 text-left">Captain</th>
                            <th className="p-3 text-left">Vice&nbsp;captain</th>
                            <th className="p-3 text-left">Chip</th>
                            <th className="p-3 text-right">Total&nbsp;pts</th>
                            <th className="p-3 text-right">Overall</th>
                            <th className="p-3 text-left">Owned&nbsp;himself</th>
                            <th className="p-3 text-left">Open</th>
                        </tr>
                    </thead>
                    <tbody className="flex-1 sm:flex-none">
                        {verifiedEntries.map((data, i) => (
                            <tr
                            className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white rounded-r-lg sm:rounded-none"
                            key={`table-row-${i}`}>
                                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    {i + 1}&nbsp;<Movement movement={data.movement}/>
                                </td>
                                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    <img className="shirt" src={data.shirtImageUrl} alt={`Plays for ${data.playsForTeam}`} title={`Plays for ${data.playsForTeam}`}/>&nbsp;<Link href={`/search/verified/${encodeURIComponent(data.slug)}`}><a className="underline">{data.plName}</a></Link>
                                </td>
                                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    {data.teamName}
                                </td>
                                <td className="text-right border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    {data.pointsThisGw}
                                </td>
                                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    {data.captain}
                                </td>
                                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    {data.viceCaptain}
                                </td>
                                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    <Chip chipUsed={data.chipUsed} short={true}/>
                                </td>
                                <td className="text-right border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    {formatNumber(data.totalPoints)}
                                </td>
                                <td className="text-right border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    {abbreviate(data.overallRank, 1)}
                                </td>
                                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                                    <ProgressBar percentage={(data.selfOwnershipWeekCount / data.gameweek) * 100} label={`${data.selfOwnershipWeekCount} GWs${data.selfOwnershipWeekCount > 0 ? ` (${data.selfOwnershipTotalPoints} pts)` : ''}`} />
                                </td>
                                <td className="text-left md:text-center border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                                    <a
                                    href={`https://fantasy.premierleague.com/entry/${data.entryId}/event/${data.gameweek}`}
                                    className="block"
                                    target="_blank"
                                    >
                                    ➡️
                                    </a>
                                </td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

interface MovementProps {
    movement: number;
}
const Movement = ({movement}: MovementProps) => {
    if (movement > 0) return (<svg className="movement movement--down" width="24" height="24" viewBox="0 0 24 24"><polygon fillRule="evenodd" points="20.521 -2.479 20.521 14.521 3.521 14.521" transform="rotate(45 12.02 6.02)"></polygon></svg>)
    else if (movement < 0) return (<svg className="movement movement--up" width="24" height="24" viewBox="0 0 24 24"><polygon fillRule="evenodd" points="20.521 8.521 20.521 25.521 3.521 25.521" transform="rotate(-135 12.02 17.02)"></polygon></svg>)
    else return (<svg className="movement movement--none" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fillRule="evenodd"></circle></svg>)
}

interface ProgressBarProps {
    percentage: number;
    label: string;
}
const ProgressBar = ({percentage, label}: ProgressBarProps) => {
    return (
        <div className="progressbar">
            <div className="progressbar__share" style={{width: `${percentage}%`}}>
                <span className="progressbar__label">{label}</span>
            </div>
        </div>
    )
}

VerifiedIndex.getInitialProps = async () => {
    const verifiedEntries = await getVerifiedEntries();
    return { verifiedEntries: verifiedEntries }
};

export default VerifiedIndex;