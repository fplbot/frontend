import Head from "next/head";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import {
  useLeagueStandings,
  CurrentGameweekSummaryState,
  getGameweekSummary,
} from "../../services/leagues";
import SimpleHeader from "../../components/Menu";
import { CenteredSpinner } from "../../components/Spinner";
import { Chip } from "../../components/Chip";
import { ErrorComponent } from "../../components/ErrorComponent";

const LeagueIndex: NextPage = () => {
  if (typeof window == "undefined") {
    return <></>;
  }

  const segs = window?.location.pathname.split("/");
  const id = parseInt(segs[segs.length - 1]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>fplbot</title>
        <meta name="description" content={`FPL League`} />
      </Head>
      <SimpleHeader />
      <div className="flex-grow md:px-8 px-2">
        <div className="w-full max-w-7xl m-auto mt-4 mb-8 md:px-8 px-2 text-center">
          <Content leagueId={id} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeagueIndex;

interface ContentProps {
  leagueId: number;
}

const Content = ({ leagueId }: ContentProps) => {

  const { standingsState } = useLeagueStandings(leagueId);
  const [showFullTable, setShowFullTable] = useState(false);

  if (standingsState.type === "LOADING") {
    return <CenteredSpinner size="lg" />;
  }

  if (standingsState.type === "ERROR") {
    return <ErrorComponent />;
  }

  function showCompleteTable() {
    setShowFullTable(true);
  }

  const data = standingsState.data;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Leagues" },
          { title: leagueId && leagueId != NaN && standingsState.type === "DATA" ? standingsState.data.league.name : "" },
        ]}
      />
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-fpl-purple mb-2">
          {data.league.name}
        </h1>
        <table className="rounded overflow-hidden sm:shadow-lg my-5 mx-auto">
          <thead>
            <tr className="bg-fpl-purple text-white rounded-l-lg sm:rounded-none">
              <th className="py-2 px-4">Rank</th>
              <th>Name</th>
              <th className="py-2 px-4">Points</th>
            </tr>
          </thead>
          <tbody className="mb-2 sm:mb-0 bg-white rounded-r-lg sm:rounded-none">
            {data.standings.results.map((item, i) => (
              <tr key={item.entry} className={`${i > 2 && !showFullTable ? "hidden sm:hidden md:table-row lg:table-row xl:table-row 2xl:table-row " : ""}`}>
                <td className="text-center border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {i === 0 && "🥇"}
                  {i === 1 && "🥈"}
                  {i === 2 && "🥉"}
                  {i > 2 && item.rank}
                </td>
                <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {item.player_name}
                </td>
                <td className="text-center border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className={!showFullTable ? "sm:visible md:hidden lg:hidden xl:hidden 2xl:hidden" : "hidden"}>
            <tr >
              <td onClick={showCompleteTable} colSpan={3} className="font-extrabold shadow hover:shadow-xl transition duration-500 text-center text-sm p-3 bg-white text-gray-500 hover:bg-gray-100 hover:text-fpl-purple cursor-pointer">
                +
            </td>
            </tr>
          </tfoot>
        </table>
        <SummaryList leagueId={leagueId} />
      </div>
    </>
  );
};

interface SummaryListProps {
  leagueId: number;
}

const SummaryList = ({ leagueId }: SummaryListProps) => {

  const [
    gameweekSummary,
    setGameweekSummary,
  ] = useState<CurrentGameweekSummaryState>({ type: "LOADING" });

  useEffect(() => {
    fetchSummary();
  }, [])

  function fetchSummary() {
    getGameweekSummary(leagueId, summaries => {
      setGameweekSummary(summaries);
    });
  }

  if (gameweekSummary.type === "ERROR") {
    return <ErrorComponent />;
  }

  if (gameweekSummary.type === "LOADING") {
    return (
      <div className="pt-8 pb-6">
        <CenteredSpinner size="sm" />
      </div>
    );
  }

  return (
    <div className="league-transfers mx-auto divide-y-2 divide-grey-light">
      {gameweekSummary.data.map((value) => (
        <div key={value.playerName} className="rounded-lg shadow bg-white mb-5">
          <div className="align-top p-3 bg-fpl-purple text-white rounded-t-lg shadow">
            <a
              href={`https://fantasy.premierleague.com/entry/${value.entry}/history`}
              className="underline font-bold"
            >
              {value.playerName}
            </a>
          </div>
          {value.chip !== undefined && <div className="font-bold text-sm bg-fpl-green text-fpl-purple"><Chip chipUsed={value.chip.name} />!</div>}

          <div className="p-3"><b></b>{value.captain} (C) & {value.viceCaptain} (VC) </div>


          <div className="text-left p-3">
            {value.transfers.length > 0 ? (
              value.transfers.map((item, i) => (
                <div
                  className={`'grid grid-cols-3' ${i > 0 ? "mt-4" : ""}`}
                  key={`${item.time}-${i}`}
                >
                  {/*<div className="italic text-xs text-gray-500">
                    {timeFormatted(item.time)}
                  </div>*/}
                  <div className="rounded-md pl-1 mb-1 flex text-xs md:text-base">
                    <div className="w-2/5">
                      <svg width="24" height="19" viewBox="0 0 24 19" className="fill-current text-red-500 inline-flex mr-1">
                        <polygon fill-rule="evenodd" points="12.82 0 12.82 4.75 0 4.75 0 14.25 12.82 14.25 12.82 19 24 9.5" transform="rotate(-180 12 9.5)">
                        </polygon>
                      </svg>
                      {item.playerOut.web_name} ({item.playerOutCost})
                    </div>
                    <div className="w-1/5"></div>
                    <div className="w-2/5">
                      <svg width="24" height="19" viewBox="0 0 24 19" className="fill-current text-green-500 inline-flex mr-1">
                        <polygon fill-rule="evenodd" points="12.82 0 12.82 4.75 0 4.75 0 14.25 12.82 14.25 12.82 19 24 9.5"></polygon>
                      </svg>
                      {item.playerIn.web_name} ({item.playerInCost})
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="italic pl-1">No transfers</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

function timeFormatted(time: Date): React.ReactNode {
  var date = new Date(time);
  return `${date.getDay()}/${date.getMonth() + 1
    } ${date.getUTCHours()}:${date.getUTCMinutes()}`;
}
