import Head from 'next/head';
import { NextPage } from "next";
import React from 'react';
import useSWR from 'swr'
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';

type League = {
  id: number;
  name: string;
}

type StandingsEntry = {
  id: number,
  player_name: string
  rank: number,
  total: number
}

type Standings = {
  results: StandingsEntry[]
}

type LeagueRes = {
  league: League,
  standings: Standings
}

type ErrorType = {

}

const LeagueIndex: NextPage = () => {
  let id = 0 as number;
  if (typeof window !== 'undefined') {
    let segs = window.location.pathname.split('/');
    id = parseInt(segs[segs.length - 1]);
  }

  const { data, error } = useSWR<LeagueRes, ErrorType>(`/api/fpl/leagues-classic/${id}/standings/`);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if(!data.league) return <div>No league found for {id}!</div>

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>fplbot</title>
        <meta
          name="description"
          content={`FPL League`}
        />
      </Head>
      <div className="flex-grow px-8">
        <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Leagues", href: "/leagues/" },
              { title: id.toString() },
            ]}
          />
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
              {data.standings.results.slice(0, data.standings.results.length > 10 ? 10 : data.standings.results.length).map((item, i) =>
              (
                <tr key={item.id}>
                  <td>{item.rank}</td>
                  <td>{item.player_name}</td>
                  <td>{item.total}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>)
}

export default LeagueIndex;