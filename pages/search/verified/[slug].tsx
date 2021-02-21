import { ServerResponse } from "http";
import Head from "next/head";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Chip } from "../../../components/Chip";
import Footer from "../../../components/Footer";
import SimpleHeader from "../../../components/SimpleHeader";
import { getVerifiedEntry, VerifiedEntry } from "../../../services/verified";
import { formatNumber } from "../../../utils/formatter";

function VerifiedEntryIndex({verifiedEntry}: {verifiedEntry: VerifiedEntry }) {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
            <Head>
                <title>{verifiedEntry.plName}</title>
                <meta
                    name="description"
                    content={`${verifiedEntry.plName} plays Fantasy Premier League. Here are details about his FPL team.`}
                />
            </Head>
            <SimpleHeader />
            <div className="flex-grow">
                <div className="w-full max-w-7xl m-auto mt-4 mb-14 text-center">
                    <Breadcrumbs breadcrumbs={[{title: 'Search', href: '/search'}, {title: 'The Premier FPL League', href: '/search/verified'}, {title: verifiedEntry.plName}]}/>
                    <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
                        {verifiedEntry.plName} <img src="/check.svg" className="verified-icon" alt="Verified"/>
                    </h1>
                </div>
                <div className="w-full max-w-2xl m-auto mb-20">
                    <div className="text-center">
                        <img className="entry-image" src={verifiedEntry.imageUrl} alt={verifiedEntry.plName}/>
                    </div>
                    <div className="border-t border-gray-200 sm:shadow rounded">
                        <dl>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Plays for
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <img className="shirt" src={verifiedEntry.shirtImageUrl} alt={`${verifiedEntry.playsForTeam}'s shirt`}/>&nbsp;{verifiedEntry.playsForTeam}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    FPL Team name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {verifiedEntry.teamName}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Gameweek Points
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {verifiedEntry.pointsThisGw}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Captain
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {verifiedEntry.captain} (VC: {verifiedEntry.viceCaptain})
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Chip played this GW
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {verifiedEntry.chipUsed ? <Chip chipUsed={verifiedEntry.chipUsed}/> : 'None'}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Total points
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatNumber(verifiedEntry.totalPoints)}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Overall rank
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatNumber(verifiedEntry.overallRank)}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Self ownership
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    Owned himself {verifiedEntry.selfOwnershipWeekCount} of {verifiedEntry.gameweek} gameweeks, earning him {formatNumber(verifiedEntry.selfOwnershipTotalPoints)} points in total.
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    FPL Team
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <a
                                        href={`https://fantasy.premierleague.com/entry/${verifiedEntry.entryId}/event/${verifiedEntry.gameweek}`}
                                        className="block underline"
                                        target="_blank"
                                        >
                                        {`https://fantasy.premierleague.com/entry/${verifiedEntry.entryId}/event/${verifiedEntry.gameweek}`}
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

interface VerifiedEntryIndexProps {
    query: {slug: string | null};
    res: ServerResponse | undefined;
}
VerifiedEntryIndex.getInitialProps = async ({query: { slug }, res }: VerifiedEntryIndexProps) => {
    if (slug) {
        const verifiedEntry = await getVerifiedEntry(decodeURI(slug));
        return { verifiedEntry: verifiedEntry }
    }

    if (res) {
        res.statusCode = 404;
        return { err: { statusCode: 404}};
    }
};

export default VerifiedEntryIndex;