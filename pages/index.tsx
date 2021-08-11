import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import AddToSlackForm from "../components/index/AddToSlackForm";
import Features from "../components/index/Features";
import Header from "../components/index/Header";
import SearchBanner from "../components/index/SearchBanner";
import { isFplSearchHost } from "../utils/hostUtils";

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Fantasy Premier League slackbot and search</title>
        <meta
          name="description"
          content="Slackbot for Fantasy Premier League. Posts live gameweek updates, standings for the league you follow and more. Search for Fantasy Premier League managers or leagues. Search by name or team name, and find FPL players and celebrities."/>
      </Head>
      <Header />
      <Features />
      <AddToSlackForm />
      <SearchBanner />
      <Footer />
    </div>
  );
}

export default Index;