import React from 'react'
import AddToSlackForm from './AddToSlackForm'

export default function Splash() {
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-5 md:col-span-3 text-white bg-gradient-to-r from-fpl-purple to-fpl-purple-gradient flex flex-col items-center justify-center px-10 relative">
        <h1 className="text-4xl md:text-6xl">Hi, I'm @fplbot 👋</h1>
        <p className="text-lg text-center">An unofficial Slackbot for Fantasy Premier League</p>
        <h4 className="absolute bottom-1 md:bottom-4 text-xl font-light" onClick={scrollToFeature}>
          See available features ⬇️
        </h4>
      </div>
      <div className="col-span-5 md:col-span-2 flex flex-col items-center justify-center">
        <h1 className="text-4xl text-fpl-purple font-medium pb-4">Try it now</h1>
        <AddToSlackForm />
      </div>
    </div>
  )

  function scrollToFeature() {
    try {
      const features = document.getElementById("features");
      features.scrollIntoView({ behavior: 'smooth'});
    } catch(err) {
      // do nothing
    }
  }
}
