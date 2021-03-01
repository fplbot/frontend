import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";
import { getVerifiedHelpText } from "../../services/getVerifiedHelpText";
import { VerifiedType } from "../../services/VerifiedType";
import {
  getVirtualLeagues,
  GetVirtualLeaguesResponse,
} from "../../services/virtual-leagues";

interface VirtualLeaguesIndexProps {
  resData: GetVirtualLeaguesResponse;
}

const VirtualLeaguesIndex: NextPage<VirtualLeaguesIndexProps> = ({
  resData,
}) => {
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
          <ul className="list-disc ml-8 pt-10">
            <HeroLink
              rel="pl"
              title="Verified PL Players"
              description="This virtual league consists of Premier League players' verified Fantasy Premier League teams."
            />
            <HeroLink
              rel="all"
              title="All verified accounts"
              description="All verifed accounts in our registry"
            />
            {resData.data.map((verifiedType) => renderLeagueLink(verifiedType))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );

  function renderLeagueLink(verifiedType: VerifiedType) {
    const shouldDisplay = shouldBeVisibleAsLink(verifiedType);
    if (!shouldDisplay.visible) {
      return null;
    }
    return (
      <HeroLink
        rel={verifiedType.toLowerCase()}
        title={shouldDisplay.title}
        description={shouldDisplay.description}
      />
    );
  }
};

interface ShouldBeVisibleAsLink {
  visible: true;
  title: string;
  description: string;
}

interface ShouldNotBeVisibleAsLink {
  visible: false;
}

type ShouldBeVisible = ShouldBeVisibleAsLink | ShouldNotBeVisibleAsLink;

function shouldBeVisibleAsLink(verifiedType: VerifiedType): ShouldBeVisible {
  switch (verifiedType) {
    case "FootballerInPL":
      return { visible: false }; // covered by a sep display
    case "Footballer":
      return {
        visible: true,
        title: "Football players",
        description: "All verified football players",
      };
    case "ChessMaster":
      return {
        visible: true,
        title: "Chess players",
        description: "Aka the Magnus Carlsen league",
      };
    case "Podcaster":
      return {
        visible: true,
        title: "Podcasters",
        description: "Famous podcasters",
      };
    case "CommunityFame":
      return {
        visible: true,
        title: "FPL community",
        description: "Relevant people from the fpl-community and twitter",
      };
    case "Actor":
      return { visible: true, title: "Actors", description: "Famous actors" };
    case "TvFace":
      return {
        visible: true,
        title: "People from TV",
        description: "People seen on TV",
      };
    case "Athlete":
      return {
        visible: true,
        title: "Athletes",
        description: "Famous athletes",
      };
    default:
      return { visible: false };
  }
}

type HeroLinkProperties = {
  title: string;
  description: string;
  rel: string;
};

function HeroLink({ title, description, rel }: HeroLinkProperties) {
  return (
    <li className="cursor-pointer pb-4" key={title}>
      <Link href={`/virtual-leagues/${rel}`}>
        <div>
          <span className="underline text-lg">{title}</span>{" "}
          <img src="/check.svg" className="verified-icon" alt="Verified" />
          <p className="text-md md:text-lg text-fpl-purple">{description}</p>
        </div>
      </Link>
    </li>
  );
}

VirtualLeaguesIndex.getInitialProps = async () => {
  var virtualLeaguesRes = await getVirtualLeagues();
  return { resData: virtualLeaguesRes };
};

export default VirtualLeaguesIndex;
