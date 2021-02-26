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
            Virtual Leagues{" "}
            <img src="/check.svg" className="verified-icon" alt="Verified" />
          </h1>
          <HeroLink rel="pl" title="Verified PL Players" description="This virtual league consists of Premier League players' verified Fantasy Premier League teams." />
          <HeroLink rel="all" title="All verified accounts" description="All verifed accounts in our registry" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

type HeroLinkProperties = {
  title: string,
  description: string,
  rel: string
}

function HeroLink({ title, description, rel } : HeroLinkProperties) {
  return (
    <>
      <ul className="list-disc ml-8 pt-10">
        <li className="cursor-pointer">
          <Link href={`/virtual-leagues/${rel}`}>
            <div>
              <span className="underline text-lg">{title}</span>
              <img
                src="/check.svg"
                className="verified-icon"
                alt="Verified" />
              <p className="text-md md:text-lg text-fpl-purple">
                {description}
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default VerifiedIndex;