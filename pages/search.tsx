import Router from "next/router";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import {
  searchForPlayer,
  SearchResponse,
  PlayerEntry,
} from "../services/search";
import { FPLBOT_APP_URL } from "../utils/envconfig";

interface SearchInit {
  type: "INIT";
}

interface SearchEmpty {
  type: "EMPTY";
}

type SearchState = SearchResponse | SearchEmpty | SearchInit;



function Index(query: {search: string | null}) {

  const [searchState, setSearchState] = useState<SearchState>({
    type: "INIT",
  });

  const [searchValue, setSearchValue] = useState<string>(query.search || "");
  const [prevSearchState, setPrevSearchState] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (query.search != null) {
      search();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Header />
      <div className="flex-grow">
        <div className="py-24 px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
            Search for fpl player
          </h1>
          <p className="text-md md:text-lg text-center text-fpl-purple">
            You can search by name or team name
          </p>

          <form className="mt-10" onSubmit={search}>
            <input
              value={searchValue}
              placeholder="Magnus Carlsen"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="w-72 py-2 px-4 mr-4 text-fpl-purple border-2 border-fpl-purple rounded focus:outline-none"
            />

            <Button onClick={search} shape="long" className="mt-4">
              Search
            </Button>
          </form>
        </div>
        <div className="pb-24 px-8 text-center">
          <SearchState
            searchState={searchState}
            searchPhrase={prevSearchState}
          />
        </div>
      </div>
      <Footer />
    </div>
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      search(e);
    }
  }

  function search(event?: any) {
    if (event) {
      event.preventDefault();
    }
    if (searchValue === "") {
      setSearchState({ type: "EMPTY" });
      return;
    }
    setPrevSearchState(searchValue);
    updateQueryParam(searchValue);
    searchForPlayer(searchValue).then((res) => {
      setSearchState(res);
    });
  }

  function updateQueryParam(searchValue: string) {
    Router.push(
      {
        pathname: "/search",
        query: { search: encodeURI(searchValue) },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }
}

Index.getInitialProps = ({ query }) => {
  return query;
};

export default Index;

interface SearchStateProps {
  searchState: SearchState;
  searchPhrase: string;
}

const SearchState = ({ searchState, searchPhrase }: SearchStateProps) => {
  if (searchState.type === "INIT") {
    return (
      <p className="text-fpl-purple">
        Search results will appear here. You can search by name or team name
      </p>
    );
  }
  if (searchState.type === "EMPTY") {
    return (
      <p className="text-fpl-purple">
        Please enter a search value. You can search by name or team name
      </p>
    );
  }
  if (searchState.type === "ERROR") {
    return (
      <p className="text-fpl-purple">
        Ooops, looks like something went wrong 🤕
      </p>
    );
  }
  if (searchState.type === "SUCCESS") {
    if (searchState.data.length < 1) {
      return (
        <p className="text-fpl-purple">
          Search for "{searchPhrase}" did not return any matches
        </p>
      );
    }
    return (
      <ResultTable
        playerEntries={searchState.data}
        searchPhrase={searchPhrase}
      />
    );
  }
};

interface ResultTableProps {
  playerEntries: PlayerEntry[];
  searchPhrase: string;
}

const ResultTable = ({ playerEntries, searchPhrase }: ResultTableProps) => {
  return (
    <div className="w-full md:w-3/6 m-auto">
      <p className="text-fpl-purple text-xl md:text-xl text-left">
        Search results for "{searchPhrase}"
      </p>
      <table className="w-full flex flex-row flex-no-wrap rounded overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white">
          {playerEntries.map((data, i) => (
            <tr
              className="bg-fpl-purple flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
              key={`table-header-${i}`}
            >
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Team name</th>
              <th className="p-3 text-left" style={{ width: "120px" }}>
                Open team
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {playerEntries.map((data, i) => (
            <tr
              className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white rounded-r-lg sm:rounded-none"
              key={`table-row-${i}`}
            >
              <td className="text-left border-grey-light border hover:bg-gray-100 p-3">
                {data.realName}
              </td>
              <td className="text-left border-grey-light border hover:bg-gray-100 p-3 truncate">
                {data.teamName}
              </td>
              <td className="text-left md:text-center border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                <a
                  href={`https://fantasy.premierleague.com/entry/${data.entry}/history`}
                  className="block"
                  target="_blank"
                >
                  ➡️
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between px-8 py-6">
      <a href="/" className="text-2xl font-bold text-fpl-purple">
        fplbot.app
      </a>
      <Button onClick={goToInstall} color="GREEN">
        Install fplbot
      </Button>
    </div>
  );

  function goToInstall() {
    window.location.href = FPLBOT_APP_URL + "/#add-to-slack";
  }
};
