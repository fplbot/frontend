import Head from "next/head";
import { NextPage } from "next";
import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import {
  useLeagueStandings,
  StandingsLeagueResult,
  CurrentGameweekSummaryState,
  getGameweekSummary,
} from "../../services/leagues";
import Button from "../../components/Button";
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

  const { standingsState } = useLeagueStandings(id);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>fplbot</title>
        <meta name="description" content={`FPL League`} />
      </Head>
      <SimpleHeader />
      <div className="flex-grow md:px-8 px-2">
        <div className="w-full max-w-7xl m-auto mt-4 mb-8 md:px-8 px-2 text-center">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Leagues" },
              { title: id && id != NaN ? id.toString() : "?" },
            ]}
          />
          <Content standingsState={standingsState} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeagueIndex;

interface ContentProps {
  standingsState: StandingsLeagueResult;
}

const Content = ({ standingsState }: ContentProps) => {
  if (standingsState.type === "LOADING") {
    return <CenteredSpinner size="lg" />;
  }

  if (standingsState.type === "ERROR") {
    return <ErrorComponent />;
  }

  const [
    gameweekSummary,
    setGameweekSummary,
  ] = useState<CurrentGameweekSummaryState>({ type: "INIT" });

  function fetchGameweekSummary() {
    setGameweekSummary({ type: "LOADING" });
    if (standingsState.type === "DATA") {
      getGameweekSummary(standingsState.data.standings.results).then((res) =>
        setGameweekSummary(res)
      );
    }
  }

  const data = standingsState.data;

  return (
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
            <tr key={item.entry}>
              <td className="text-center border-grey-light border hover:bg-gray-100 p-3 truncate">
                {i === 0 && "🥇"}
                {i === 1 && "🥈"}
                {i === 2 && "🥉"}
                {i !== 0 && i !== 1 && i !== 2 && item.rank}
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
      </table>
      <SummaryList
        gameweekSummary={gameweekSummary}
        fetchSummary={fetchGameweekSummary}
      />
    </div>
  );
};

interface SummaryListProps {
  gameweekSummary: CurrentGameweekSummaryState;
  fetchSummary: () => void;
}

const SummaryList = ({ gameweekSummary, fetchSummary }: SummaryListProps) => {
  if (gameweekSummary.type === "INIT") {
    return (
      <div className="py-4">
        <Button onClick={fetchSummary} shape="square">
          Load transfers
        </Button>
      </div>
    );
  }

  if (gameweekSummary.type === "ERROR") {
    return <ErrorComponent />;
  }

  if (gameweekSummary.type === "LOADING") {
    return (
      <div className="py-4">
        <CenteredSpinner size="sm" />
      </div>
    );
  }

  return (
    <div className="league-transfers mx-auto divide-y-2 divide-grey-light">
      {gameweekSummary.data.map((value) => (
        <div key={value.playerName} className="pt-4">
          <div className="text-left align-top font-bold">
            <a
              href={`https://fantasy.premierleague.com/entry/${value.entry}/history`}
              className="underline"
            >
              {value.playerName}
            </a>{" "}
            {value.chip !== undefined && <span className="pl-4"><Chip chipUsed={value.chip.name} /></span>}
          </div>
          <div className="text-left align-top p-3">
            {value.transfers.length > 0 ? (
              value.transfers.map((item, i) => (
                <div
                  className={`'grid grid-cols-3' ${i > 0 ? "mt-4" : ""}`}
                  key={`${item.time}-${i}`}
                >
                  {/*<div className="italic text-xs text-gray-500">
                    {timeFormatted(item.time)}
                  </div>*/}
                  <div className="rounded-md pl-1 mb-1 flex">
                    <div className="w-2/5">
                      {item.playerOut.web_name} ({item.playerOutCost})
                    </div>
                    <div className="w-1/5">➡️</div>
                    <div className="w-2/5">
                      {item.playerIn.web_name} ({item.playerInCost})
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="italic">No transfers</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

function timeFormatted(time: Date): React.ReactNode {
  var date = new Date(time);
  return `${date.getDay()}/${
    date.getMonth() + 1
  } ${date.getUTCHours()}:${date.getUTCMinutes()}`;
}
