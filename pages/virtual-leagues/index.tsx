import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";
import { getVerifiedHelpText } from "../../services/getVerifiedHelpText";
import { VerifiedType } from "../../services/VerifiedType";
import { getVirtualLeagues, GetVirtualLeaguesResponse } from "../../services/virtual-leagues";

interface VirtualLeaguesIndexProps {
  resData: GetVirtualLeaguesResponse
}

const VirtualLeaguesIndex: NextPage<VirtualLeaguesIndexProps> = ({ resData }) => {
  if (resData.type == "ERROR")
    return (
      <p className="pb-16 text-lg md:text-xl text-fpl-purple text-center">
        Looks like something went wrong 🤕
      </p>
    );
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
          {resData.data.map((verifiedType, i) => shouldBeVisibleAsLink(verifiedType) && (
            <HeroLink rel={verifiedType.toLowerCase()} title={getVerifiedHelpText(verifiedType)} description={verifiedType} />
          ))}
          <HeroLink rel="all" title="All verified accounts" description="All verifed accounts in our registry" />
        </div>
      </div>
      <Footer />
    </div>
  );
};


function shouldBeVisibleAsLink(verifiedType: VerifiedType): boolean {
  switch (verifiedType) {
    case 'FootballerInPL':
      return false // covered by a sep display
    case 'Footballer':
      return true
    case 'ChessMaster':
      return true
    case 'Podcaster':
      return true
    case 'CommunityFame':
      return true;
    case 'Actor':
      return true;
    case 'TvFace':
      return true;
    case 'Athlete':
      return true;
    default:
      return false;
  }
}

type HeroLinkProperties = {
  title: string,
  description: string,
  rel: string
}

function HeroLink({ title, description, rel }: HeroLinkProperties) {
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

VirtualLeaguesIndex.getInitialProps = async () => {
  var virtualLeaguesRes = await getVirtualLeagues();
  return { resData: virtualLeaguesRes };
};


export default VirtualLeaguesIndex;