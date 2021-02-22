import { NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import AddToSlackForm from "../components/index/AddToSlackForm";
import Features from "../components/index/Features";
import Header from "../components/index/Header";
import SearchBanner from "../components/index/SearchBanner";
import { isFplSearchHost } from "../utils/hostUtils";

function Index({shouldHighlightSearch}: {shouldHighlightSearch: boolean}) {
  return (
    <div>
      <Head>
        <title>{shouldHighlightSearch ? 'Fantasy Premier League Search' : 'fplbot'}</title>
        <meta
          name="description"
          content={shouldHighlightSearch ? 'Search for fantasy premier league managers. Search by name or team name, and find fpl players and celebrities.' : 'Slack bot for fantasy premier league. Posts live gameweek updates, standings for the league you follow and more!'}
        />
      </Head>
      <Header shouldHighlightSearch={shouldHighlightSearch} />
      <Features />
      <AddToSlackForm />
      { shouldHighlightSearch || <SearchBanner /> }
      <Footer />
    </div>
  );
}

Index.getInitialProps = async (ctx: NextPageContext) => {

  const shouldHighlightSearch = ctx.req?.headers.host ? isFplSearchHost(ctx.req.headers.host) : false;

  return { shouldHighlightSearch: shouldHighlightSearch }
};

export default Index;