import { useState } from "react";
import { FPLBOT_APP_URL } from "../utils/envconfig";

export default function Menu() {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-md mb-3 text-fpl-purple">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <a
              className="text-2xl font-bold font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-fpl-purple"
              href="/"
            >
              fplbot.app
            </a>
            <button
              className="text-fpl-purple cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <img
                src="/hamburger.png"
                alt="hamburger-icon"
                className="hamburger-icon"
              />
            </button>
          </div>
          <div
            className={
              "md:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col md:flex-row list-none md:ml-auto md:items-center">
              <li className="pr-8 pt-4 md:pt-0">
                <a
                  className="font-bold leading-snug text-fpl-purple hover:opacity-75"
                  href="/search"
                >
                  Search
                </a>
              </li>
              <li className="pr-8 pt-4 md:pt-0">
                <a
                  className="font-bold leading-snug text-fpl-purple hover:opacity-75"
                  href="/virtual-leagues"
                >
                  Virtual leagues
                </a>
              </li>
              <li className="hidden md:block">
                <button onClick={goToInstall} className="font-bold rounded shadow hover:shadow-xl transition duration-500 text-fpl-purple hover:text-white bg-fpl-green hover:bg-fpl-purple py-1 px-4">
                  Install fplbot
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );

  function goToInstall() {
    window.location.href = FPLBOT_APP_URL + "/#add-to-slack";
  }
}
