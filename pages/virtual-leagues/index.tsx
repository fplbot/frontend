import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";

const VerifiedIndex: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>Premier League players' FPL teams</title>
        <meta name="description" content="Premier League players in FPL" />
      </Head>
      <SimpleHeader />
      <div className="flex-grow">
        <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Virtual Leagues", href: "/virtual-leagues/" },
            ]}
          />

          <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-4 text-center">
            Viritual Leagues{" "}
            <img src="/check.svg" className="verified-icon" alt="Verified" />
          </h1>

          <ul className="list-disc ml-8">
            <li className="cursor-pointer">
              <Link href="/virtual-leagues/pl">
                <div>
                  <span className="underline text-lg">Verified PL Players </span>

                  <img
                    src="/check.svg"
                    className="verified-icon"
                    alt="Verified"
                  />
                  <p className="text-md md:text-lg text-fpl-purple">
                    This virtual league consists of Premier League players'
                    verified Fantasy Premier League teams.
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifiedIndex;
