import React from "react";
import { FPLBOT_APP_URL } from "../../utils/envconfig";
import Button from "../Button";

function Header() {
  return (
    <div className="bg-gradient-to-tr from-white to-gray-200">
      <div className="flex justify-between mx-auto px-8 py-6">
        <a href={FPLBOT_APP_URL} className="text-2xl font-bold text-fpl-purple">
          fplbot.app
        </a>
        <Button onClick={scrollToFeature}>Try it now</Button>
      </div>

      <div className="relative">
        <div className="block h-64 w-full bg-fpl-purple absolute bottom-0 inset-x-0" />

        <div className="container mx-auto py-24 px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold  text-fpl-purple">
            Hi, I'm @fplbot 👋
          </h1>
          <p className="text-lg text-center text-fpl-purple mt-4">
            An unofficial Slackbot for Fantasy Premier League
          </p>

          <Button
            onClick={scrollToFeature}
            color="GREEN"
            className="mt-8 mb-16 text-2xl"
            size="lg"
          >
            Try fplbot
          </Button>

          <div className="relative shadow-2xl">
            <img
              src="/slack.png"
              className="rounded-lg"
              alt="slack screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );

  function scrollToFeature() {
    try {
      const features = document.getElementById("add-to-slack");
      features.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      // do nothing
    }
  }
}

export default Header;
