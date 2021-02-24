import React from 'react'
import FeatureImageBox from '../FeatureImageBox'

export default function Features() {
  return (

    <div id="features" className="relative bg-fpl-purple">

      <div className="relative">

        <div className="block h-48 w-full bg-gray-200 absolute bottom-0 inset-x-0" />

        <div className="relative container mx-auto pb-16 px-8">

          <div className="max-w-screen-sm m-auto text-white pb-12">
            <h1 className="text-2xl md:text-6xl pb-2 font-bold">Features</h1>
            <ul className="list-disc text-xl leading-relaxed">
              <li><b>Live updates</b> on events during gameweeks</li>
              <li>Notifies about transfer deadlines</li>
              <li>Posts a summary, including <b>transfers, chips used and captain picks</b>, for your league when a gameweek starts</li>
              <li>Posts <b>league standings</b> at the end of each gameweek</li>
              <li>Price changes, injuries and more</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">

            <FeatureImageBox imageUrl={"/taunts.png"} alt="live update example"/>

            <div className="md:col-span-1" />

            <div className="md:col-span-1" />

            <FeatureImageBox imageUrl={"/injuries.png"}  alt="injuries example"/>

            <FeatureImageBox imageUrl={"/standings.png"}  alt="current standings example"/>

          </div>

        </div>

      </div>

    </div>

  )
}
