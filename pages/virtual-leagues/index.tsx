import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/SimpleHeader";

const VerifiedIndex: NextPage = () => {
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
              { title: "Virtual Leagues", href: "/virtual-leagues/" }
            ]}
          />
           
            <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
              <Link href="/virtual-leagues/pl">
                <a className="underline">Verified PL Players{" "}</a>
              </Link>
              <img src="/check.svg" className="verified-icon" alt="Verified" />
            </h1>
          
          <p className="text-md md:text-lg text-center text-fpl-purple">
            This virtual league consists of Premier League players' verified
            Fantasy Premier League teams.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifiedIndex;
