import { abbreviate } from "@pqt/abbreviate";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Chip } from "../../../components/Chip";
import Footer from "../../../components/Footer";
import SimpleHeader from "../../../components/Menu";
import {
  getPLVerifiedEntries, GetVerifiedPLEntriesResponse, VerifiedPLEntry
} from "../../../services/verified";
import { formatNumber } from "../../../utils/formatter";
import { getEntryUrl } from "../../../utils/urlHelper";

interface VerifiedIndexProps {
  verifiedEntriesData: GetVerifiedPLEntriesResponse;
}

const VerifiedIndex: NextPage<VerifiedIndexProps> = ({
  verifiedEntriesData,
}: VerifiedIndexProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>Premier League players' FPL teams</title>
        <meta name="description" content="Premier League players in FPL" />
      </Head>
      <SimpleHeader />
      <div className="flex-grow">
        <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Virtual Leagues", href: "/virtual-leagues/" },
              { title: "PL", href: "/virtual-leagues/pl" },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
            Verified PL Players{" "}
            <img src="/check.svg" className="verified-icon" alt="Verified" />
          </h1>
          <p className="text-md md:text-lg text-center text-fpl-purple">
            This virtual league consists of Premier League players' verified
            Fantasy Premier League teams.
          </p>
        </div>
      </div>
      {verifiedEntriesData.type === "SUCCESS" ? (
        <VerifiedTable verifiedEntries={verifiedEntriesData.data} />
      ) : (
        <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
          Looks like something went wrong 🤕
        </p>
      )}

      <Footer />
    </div>
  );
};

interface VerifiedTableProps {
  verifiedEntries: VerifiedPLEntry[];
}

const VerifiedTable = ({ verifiedEntries }: VerifiedTableProps) => {
  return (
    <div className="w-full m-auto mb-20 px-8 verified-table">
      <table className="w-full table-fixed my-5">
        <thead className="text-white">
          <tr className="bg-fpl-purple">
            <th className="verified-table__pos p-3 text-left">#</th>
            <th className="verified-table__player p-3 text-left">Player</th>
            <th className="verified-table__gwpts verified-table__group2 p-3 text-right ">
              GW&nbsp;pts
            </th>
            <th className="verified-table__cap verified-table__group2 p-3 text-left">
              Captain
            </th>
            <th className="verified-table__chip verified-table__group2 p-3 text-left">
              Chip
            </th>
            <th className="verified-table__total verified-table__group3 p-3 text-right">
              Total&nbsp;pts
            </th>
            <th className="verified-table__or verified-table__group3 p-3 text-right">
              Overall
            </th>
            <th className="verified-table__selfown verified-table__group3 p-3 text-left">
              Owned&nbsp;himself
            </th>
            <th className="verified-table__open verified-table__group4 p-3 text-center">
              Open
            </th>
          </tr>
        </thead>
        <tbody className="">
          {verifiedEntries.map((data, i) => (
            <tr className="mb-2 sm:mb-0 bg-white rounded-r-lg sm:rounded-none">
              <td className="verified-table__pos text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                {i + 1}&nbsp;
                <Movement movement={data.movement} />
              </td>
              <td className="verified-table__player text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                <div className="verified-table__player_inner">
                <span  className="verified-table__player_inner_shirt">
                <img
                  className="shirt"
                  src={data.shirtImageUrl}
                  alt={`Plays for ${data.playsForTeam}`}
                  title={`Plays for ${data.playsForTeam}`}
                />
                </span>
                <span>
                <Link
                  href={`/verified/pl/${data.entryId}/${encodeURIComponent(data.slug)}`}
                >
                  <a className="underline">{data.plName}</a>
                </Link>
                <p className="text-sm">{data.teamName}</p>
                </span>
                </div>
              </td>
              <td className="verified-table__gwpts verified-table__group2 text-right border-grey-light border hover:bg-gray-100 p-3 truncate">
                {data.pointsThisGw}
              </td>
              <td className="verified-table__cap verified-table__group2 text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                {data.captain} {data.viceCaptain && `(${data.viceCaptain})`}
              </td>
              <td className="verified-table__chip verified-table__group2 text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                {data.chipUsed ? (
                  <Chip chipUsed={data.chipUsed} short={true} />
                ) : (
                  <span>&nbsp;</span>
                )}
              </td>
              <td className="verified-table__total verified-table__group3 text-right border-grey-light border hover:bg-gray-100 p-3 truncate">
                {formatNumber(data.totalPoints)}
              </td>
              <td className="verified-table__or verified-table__group3 text-right border-grey-light border hover:bg-gray-100 p-3 truncate">
                {abbreviate(data.overallRank, 1)}
              </td>
              <td className="verified-table__selfown verified-table__group3 text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                <ProgressBar
                  percentage={
                    (data.selfOwnershipWeekCount / data.gameweek) * 100
                  }
                  label={`${data.selfOwnershipWeekCount} GWs${
                    data.selfOwnershipWeekCount > 0
                      ? ` (${data.selfOwnershipTotalPoints} pts)`
                      : ""
                  }`}
                />
              </td>
              <td className="verified-table__open verified-table__group4 text-center border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                <a
                  href={getEntryUrl(data.entryId, data.gameweek)}
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
  );
};

interface MovementProps {
  movement: number;
}
const Movement = ({ movement }: MovementProps) => {
  if (movement > 0)
    return (
      <svg
        className="movement movement--down"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <polygon
          fillRule="evenodd"
          points="20.521 -2.479 20.521 14.521 3.521 14.521"
          transform="rotate(45 12.02 6.02)"
        ></polygon>
      </svg>
    );
  else if (movement < 0)
    return (
      <svg
        className="movement movement--up"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <polygon
          fillRule="evenodd"
          points="20.521 8.521 20.521 25.521 3.521 25.521"
          transform="rotate(-135 12.02 17.02)"
        ></polygon>
      </svg>
    );
  else
    return (
      <svg
        className="movement movement--none"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="12" fillRule="evenodd"></circle>
      </svg>
    );
};

interface ProgressBarProps {
  percentage: number;
  label: string;
}
const ProgressBar = ({ percentage, label }: ProgressBarProps) => {
  return (
    <div className="progressbar">
      <div className="progressbar__share" style={{ width: `${percentage}%` }}>
        <span className="progressbar__label">{label}</span>
      </div>
    </div>
  );
};

VerifiedIndex.getInitialProps = async () => {
  const verifiedEntries = await getPLVerifiedEntries();
  return { verifiedEntriesData: verifiedEntries };
};

export default VerifiedIndex;
