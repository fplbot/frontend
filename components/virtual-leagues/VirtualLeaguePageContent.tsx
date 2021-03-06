import Head from "next/head";
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import Footer from "../Footer";
import SimpleHeader from "../Menu";
import VerifiedTable from "./VerifiedTable";
import {  VerifiedEntry} from "../../services/verified";

interface VirtualLeaguePageContentProps {
  title: string;
  description: string;
  verifiedEntries: VerifiedEntry[];
  relUrl: string
}

export default function VirtualLeaguePageContent ({
  title,
  description,
  relUrl,
  verifiedEntries
} : VirtualLeaguePageContentProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <SimpleHeader />
      <div className="flex-grow">
        <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Virtual Leagues", href: "/virtual-leagues/" },
              { title: relUrl.charAt(0).toUpperCase() + relUrl.slice(1), href: `/virtual-leagues/${relUrl}` },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
            {title}{" "}
            <img src="/check.svg" className="verified-icon" alt="Verified" />
          </h1>
          <p className="text-md md:text-lg text-center text-fpl-purple">
            {description}
          </p>
        </div>
      </div>
      <VerifiedTable verifiedEntries={verifiedEntries} />
      <Footer />
    </div>
  );
};
