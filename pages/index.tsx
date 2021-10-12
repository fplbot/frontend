import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Features from "../components/index/Features";
import Header from "../components/index/Header";

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Fantasy Premier League Slack/Discord chatbot and search</title>
        <meta name="title" content="Fantasy Premier League Slack/Discord chatbot and search" />
        <meta
          name="description"
          content="Posts live gameweek updates, standings for the league you follow and more. Search for Fantasy Premier League managers or leagues. Search by name or team name, and find FPL players and celebrities."/>
      </Head>
      <Header />
      <Features />
      <Footer />
    </div>
  );
}

export default Index;
