import { NextPageContext } from "next";
import React from "react";
import Error from "next/error";
import FeatureImageBox from "../components/FeatureImageBox";
import Footer from "../components/Footer";

type SuccessType = "slack" | "discord" | "unknown";
interface SuccessProps {
  type: SuccessType;
}

const Success = ({ type }: SuccessProps) => {
  if (type == "slack") return <SlackSuccess />;
  if (type == "discord") return <DiscordSuccess />;
  return <Error statusCode={404} />;
};

const SlackSuccess = () => {
  return (
    <div>
      <title>You have installed fplbot!</title>
      <meta
        name="description"
        content="Slack bot for fantasy premier league. Posts live gameweek updates, standings for the league you follow and more!"
      />
      <div className="bg-fpl-purple">
        <div className="flex justify-between mx-auto px-8 py-6">
          <a className="text-2xl font-bold text-fpl-green" href="/">
            fplbot.app
          </a>
        </div>

        <div className="">
          <div className="container mx-auto py-40 px-8 text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-200">
              Success!
            </h1>
            <p className="text-lg text-center text-gray-200">
              fplbot is now installed in your workspace 🎉
            </p>

            <h4 className="m-16 mb-8 text-gray-200 font-bold text-xl md:text-2xl">
              Invite @fplbot into a channel and configure it!
            </h4>

            <div className="shadow-2xl max-w-xl mx-auto p-2">
              <img src="/invite.png" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-tr from-white to-gray-200">
        <div className="relative">
          <div className="block h-48 w-full bg-fpl-pink absolute bottom-0 inset-x-0" />

          <div className="relative container mx-auto py-20 px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 text-fpl-purple">
              <div className="md:col-span-1" />

              <div className="md:col-span-2">
                <h1 className="text-xl md:text-2xl pb-2 max-w-sm m-auto">
                  <b className="text-2xl md:text-3xl">Tip:</b> Type "@fplbot
                  help" to see available commands at any time
                </h1>
              </div>

              <FeatureImageBox
                imageUrl="/success.png"
                alt="example of how to invite the bot to a channel"
              />

              <div className="md:col-span-1" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const DiscordSuccess = () => {
  return (
    <div>
      <title>You have installed fplbot!</title>
      <meta
        name="description"
        content="Discord bot for fantasy premier league. Posts live gameweek updates, standings for the league you follow and more!"
      />
      <div className="bg-fpl-purple">
        <div className="flex justify-between mx-auto px-8 py-6">
          <a className="text-2xl font-bold text-fpl-green" href="/">
            fplbot.app
          </a>
        </div>

        <div className="">
          <div className="container mx-auto py-40 px-8 text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-200">
              Success!
            </h1>
            <p className="text-lg text-center text-gray-200">
              @fplbot is now installed in your Discord server 🎉
            </p>

            <h4 className="m-16 mb-8 text-gray-200 font-bold text-xl md:text-2xl">
              Now setup @fplbot in a channel using the slash commands
            </h4>

            <div className="shadow-2xl max-w-xl mx-auto p-2">
              <img src="/slash-commands.png" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-tr from-white to-gray-200">
        <div className="relative">
          <div className="block h-48 w-full bg-fpl-pink absolute bottom-0 inset-x-0" />

          <div className="relative container mx-auto py-20 px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 text-fpl-purple">
              <div className="md:col-span-1" />

              <div className="md:col-span-2">
                <h1 className="text-xl md:text-2xl pb-2 max-w-sm m-auto">
                  <b className="text-2xl md:text-3xl">ℹ️NB!</b> The bot don't
                  respond to chat messages using prefixes! It only repond to
                  slash commands.
                </h1>
              </div>

              <FeatureImageBox
                imageUrl="/add-sub-discord.png"
                alt="adding a subscription to a channel"
              />

              <div className="md:col-span-1" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

Success.getInitialProps = async ({
  query,
}: NextPageContext): Promise<SuccessProps> => {
  if (query.type == "slack" || query.type == "discord") {
    return {
      type: query.type,
    };
  }

  if (!query.type) {
    return {
      type: "slack",
    };
  }
  return {
    type: "unknown",
  };
};

export default Success;
