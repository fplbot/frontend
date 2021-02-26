import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Chip } from "../../components/Chip";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";
import { getVerifiedEntry, GetVerifiedEntryResponse} from "../../services/verified";
import { formatNumber } from "../../utils/formatter";

interface GetVerifiedEntryNoSlug {
  type: "NO_SLUG";
}

export type GetVerifiedEntryStatus =
  | GetVerifiedEntryResponse
  | GetVerifiedEntryNoSlug;

interface VerifiedEntryIndexProps {
  verifiedEntryData: GetVerifiedEntryStatus;
}

const VerifiedEntryIndex: NextPage<VerifiedEntryIndexProps> = ({verifiedEntryData}: VerifiedEntryIndexProps) => {

  if (verifiedEntryData.type === 'NO_SLUG' || verifiedEntryData.type === 'ERROR') {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
          <Head>
            <title>fplbot</title>
            <meta
              name="description"
              content={`This player plays Fantasy Premier League. Here are details about his FPL team.`}
            />
          </Head>
          <SimpleHeader />
          <div className="flex-grow px-8">
            <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
              <Breadcrumbs
                breadcrumbs={[
                  { title: "Home", href: "/" },
                  { title: "Virtual Leagues", href: "/virtual-leagues/" },
                  { title: "All", href: "/virtual-leagues/all" },
                  { title: '...' },
                ]}
              />
              <h1 className="text-xl md:text-2xl font-bold text-fpl-purple mb-2">
                {verifiedEntryData.type === "NO_SLUG" ? "This player does not exist" : "Ops, looks like something went wrong 🤕"}
              </h1>
            </div>
          </div>
          <Footer />
        </div>
    );
  }

  const verifiedEntry = verifiedEntryData.data;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>{verifiedEntry.realName}</title>
        <meta
          name="description"
          content={`${verifiedEntry.realName} plays Fantasy Premier League. Here are details about his FPL team.`}
        />
      </Head>
      <SimpleHeader />
      <div className="flex-grow px-8">
        <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Virtual Leagues", href: "/virtual-leagues/" },
              { title: "All", href: "/virtual-leagues/all" },
              { title: verifiedEntry.realName },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
            {verifiedEntry.realName}{" "}
            <img src="/check.svg" className="verified-icon" alt="Verified" />
          </h1>
        </div>
        <div className="w-full max-w-2xl m-auto mb-20">   
          <div className="border-t border-gray-200 sm:shadow rounded">
            <dl>      
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
                <dt className="text-sm font-medium text-gray-500">Captain</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {verifiedEntry.captain} (VC: {verifiedEntry.viceCaptain})
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Chip played this GW
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {verifiedEntry.chipUsed ? (
                    <Chip chipUsed={verifiedEntry.chipUsed} />
                  ) : (
                    "None"
                  )}
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
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">FPL Team</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 truncate">
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
};

VerifiedEntryIndex.getInitialProps = async ({query}) => {
  if (query.slug) {
    const entryId = parseInt(query.slug[0]);
    if (!entryId)
      return { verifiedEntryData: { type: "NO_SLUG" } }
    const verifiedEntry = await getVerifiedEntry(entryId);    
    return {       
      verifiedEntryData: verifiedEntry
     };
  }
  return {
    verifiedEntryData: {type: "NO_SLUG"}
  }
};

export default VerifiedEntryIndex;
