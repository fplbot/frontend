import React from 'react'
import FeatureImageBox from '../components/FeatureImageBox'
import Footer from '../components/Footer'

export default function Success() {
  return (
    <div>
      <div className="bg-fpl-purple">
        <div className="flex justify-between mx-auto px-8 py-6">
          <h3 className="text-2xl font-bold text-fpl-green">fplbot.app</h3>
        </div>

        <div className="">

          <div className="container mx-auto py-40 px-8 text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-200">
              Success!
            </h1>
            <p className="text-lg text-center text-gray-200">fplbot is now installed in your workspace 🎉</p>

            <h4 className="m-16 mb-8 text-gray-200 font-bold text-xl md:text-2xl">
              Now you just have to invite @fplbot to a channel
            </h4>

            <div className="shadow-2xl max-w-xl mx-auto p-2">
              <img src="/invite.png" className="rounded-lg" />
            </div>

          </div>

        </div>
      </div>

      <div className="bg-gradient-to-tr from-white to-gray-300">

        <div className="relative">

          <div className="block h-48 w-full bg-fpl-pink absolute bottom-0 inset-x-0" />

          <div className="relative container mx-auto py-20 px-8">

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 text-fpl-purple">

              <div className="md:col-span-1" />

              <div className="md:col-span-2">
                <h1 className="text-xl md:text-2xl pb-2 max-w-sm m-auto">
                  <b className="text-2xl md:text-3xl">Tip:</b> Type "@fplbot help" to see available commands at any time
                </h1>
              </div>

              <FeatureImageBox imageUrl="/success.png" />

              <div className="md:col-span-1" />

            </div>

          </div>
        </div>

      </div>

      <Footer />

    </div>
  )
}
