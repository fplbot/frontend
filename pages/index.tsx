import { NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import AddToSlackForm from "../components/index/AddToSlackForm";
import Features from "../components/index/Features";
import Header from "../components/index/Header";
import SearchBanner from "../components/index/SearchBanner";
import { isFplSearchHost } from "../utils/hostUtils";

function Index({shouldHightlightSearch}) {
  return (
    <div>
      <Head>
        <title>{shouldHightlightSearch ? 'Fantasy Premier League Search' : 'fplbot'}</title>
        <meta
          name="description"
          content={shouldHightlightSearch ? 'Search for FPL player' : 'An unofficial Slackbot for Fantasy Premier League'}
        />
      </Head>
      <Header shouldHightlightSearch={shouldHightlightSearch} />
      <Features />
      <AddToSlackForm />
      { shouldHightlightSearch ? null : <SearchBanner /> }
      <Footer />
    </div>
  );
}

Index.getInitialProps = async (ctx: NextPageContext) => {
  return { shouldHightlightSearch: isFplSearchHost(ctx.req.headers.host) }
};

export default Index;