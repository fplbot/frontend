import Head from 'next/head';
import { NextPage } from "next";
import React, { useState } from 'react';
import useSWR from 'swr'
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';
import { getTransfersForEntries, LeagueRes, LeagueResError, EntryTransfer, http } from '../../services/leagues';
import Button from '../../components/Button';
import SimpleHeader from '../../components/Menu';

const LeagueIndex: NextPage = () => {

  if (typeof window == 'undefined') {
    return (<></>)
  }

  const segs = window?.location.pathname.split('/');
  const id = parseInt(segs[segs.length - 1]);

  const [playerTransfers, setPlayerTransfers] = useState<EntryTransfer[]>([]);
  const { data, error } = useSWR<LeagueRes, LeagueResError>(`/api/fpl/leagues-classic/${id}/standings/`, http);

  async function fetchTransfersClick() {
    if (data) {
      var transfers = await getTransfersForEntries(data.standings.results)
      setPlayerTransfers(transfers);
    }
  };

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
                <div className="flex-grow px-8">
                  <div className="w-full max-w-7xl m-auto mt-4 mb-8 px-8 text-center">
                    {playerTransfers && playerTransfers.map((item, i) => (<div key={i}>{item.entry.player_name} : {item.playerOut.web_name} ➡️ {item.playerIn.web_name}</div>))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </div>)
};

export default LeagueIndex;
