import Head from 'next/head';
import { NextPage } from "next";
import React, { Component, useState } from 'react';
import useSWR from 'swr'
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';
import { getTransfersForEntries, LeagueRes, LeagueResError, Entry, EntryTransfer, http } from '../../services/leagues';
import Button from '../../components/Button';
import SimpleHeader from '../../components/Menu';

const LeagueIndex: NextPage = () => {

  if (typeof window == 'undefined') {
    return (<></>)
  }

  const segs = window?.location.pathname.split('/');
  const id = parseInt(segs[segs.length - 1]);

  const [playerTransfers, setPlayerTransfers] = useState<Map<string, EntryTransfer[]>>(new Map<string, EntryTransfer[]>());
  const { data, error } = useSWR<LeagueRes, LeagueResError>(`/api/fpl/leagues-classic/${id}/standings/`, http);

  async function fetchTransfersClick() {
    if (data) {
      var transfers = await getTransfersForEntries(data.standings.results)
      setPlayerTransfers(transfers);
    }
  };

  const items: JSX.Element[] = [];
  playerTransfers.forEach((value: EntryTransfer[], key: string) => {
    items.push((
      <div key={key} className="divide-y-4 divide-fpl-purple">
        <div className="text-left align-top font-bold">
          {key}
        </div>
        <div className="text-left align-top p-3">
          {value.length > 0 ? value.map((item, i) =>
          (
            <div className={`'grid grid-cols-3' ${i > 0 ? 'mt-4' : ''}`}>
              <div className="italic text-xs text-gray-500">{timeFormatted(item.time) }</div>
              <div className="bg-red-200 rounded-md pl-1 mb-1">{item.playerOut.web_name}({item.playerOutCost})</div>
              <div className="bg-green-200 rounded-md pl-1">{item.playerIn.web_name}({item.playerInCost})</div>
            </div>
          ))
            :
            (<div className="italic">No transfers</div>)
          }
        </div>
      </div>
    ));
  });


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>fplbot</title>
        <meta
          name="description"
          content={`FPL League`}
        />
      </Head>
      <SimpleHeader />
      <div className="flex-grow px-8">
        <div className="w-full max-w-7xl m-auto mt-4 mb-8 px-8 text-center">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Leagues" },
              { title: id && id != NaN ? id.toString() : '?' },
            ]}
          />
          {error ? (<div>Error!</div>) : (<></>)}
          {!error && !data ? (<div>Loading league</div>) : (<></>)}
          {!data?.league ? (<>No league found!</>) :
            (
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-fpl-purple mb-2">
                  {data.league.name}
                </h1>
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.standings.results.map((item, i) =>
                    (
                      <tr key={item.entry}>
                        <td>{item.rank}</td>
                        <td>{item.player_name}</td>
                        <td>{item.total}</td>
                      </tr>
                    )
                    )}
                  </tbody>
                </table>
                <div className="flex-grow px-8">
                  <div className="w-full max-w-7xl m-auto mt-4 mb-8 px-8 text-center">
                    <Button onClick={fetchTransfersClick} shape="square" >
                      Show all transfers!
                    </Button>
                  </div>
                </div>
                {items.length > 0 ? (
                  <div>
                      {items}
                  </div>
                ) : (<></>)}
              </div>
            )}
        </div>
      </div>
      <Footer />
    </div>)
};

export default LeagueIndex;

function timeFormatted(time: Date): React.ReactNode {
  var date = new Date(time)
  return `${date.getDay()}/${date.getMonth()+1} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
}

