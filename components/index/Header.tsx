import React from "react";
import Button from "../Button";
import SearchBarSection from "./SearchBarSection";
import Menu from '../Menu';
import AddToSlackForm from "./AddToSlackForm";

function Header() {
  return (
    <div className="bg-gradient-to-tr from-white to-gray-200">

      <Menu/>

      <div className="relative">
        <div className="block h-64 w-full bg-fpl-purple absolute bottom-0 inset-x-0" />

        <div className="container mx-auto py-24 px-8 text-center">
          <SearchBarSection />
          <h2 className="text-3xl md:text-4xl font-bold text-fpl-purple">
            👆 This search is part of @fplbot
          </h2>
          <p className="text-lg text-center text-fpl-purple mt-4">
            An unofficial Slackbot for Fantasy&nbsp;Premier&nbsp;League
          </p>
          <AddToSlackForm />


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
      if (features != null) {
        features.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      // do nothing
    }
  }
}

export default Header;
