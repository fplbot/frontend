import React from 'react';
import Button from './Button';

function Header() {
  return (
    <div className="bg-gradient-to-tr from-white to-gray-300">
      <div className="flex justify-between mx-auto px-8 py-6">
        <h3 className="text-2xl font-bold text-fpl-purple">fplbot</h3>
        <Button>Try it now</Button>
      </div>

      <div className="relative">

        <div className="block h-64 w-full bg-fpl-purple absolute bottom-0 inset-x-0" />

        <div className="container mx-auto py-24 px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold  text-fpl-purple">
            Hi, I'm @fplbot 👋
          </h1>
          <p className="text-lg text-center text-fpl-purple">An unofficial Slackbot for Fantasy Premier League</p>

          <button className="items-center py-2 px-8 mt-8 mb-16 font-bold text-2xl text-fpl-purple hover:text-white bg-fpl-green hover:bg-fpl-purple rounded shadow hover:shadow-xl transition duration-500 ">
            Try fplbot
          </button>

          <div className="relative shadow-2xl">
            <img src="/slack.png" className="rounded-lg" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Header;