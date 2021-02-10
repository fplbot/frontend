import Head from "next/head";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import {
  searchForPlayer,
  SearchResponse,
  PlayerEntry,
  VerifiedType,
} from "../services/search";
import { FPLBOT_APP_URL } from "../utils/envconfig";

interface SearchInit {
  type: "INIT";
}

interface SearchEmpty {
  type: "EMPTY";
}

type SearchState = SearchResponse | SearchEmpty | SearchInit;

function Index(query: {search: string | null, page: number}) {

  const [searchValue, setSearchValue] = useState<string>(query.search ? decodeURI(query.search) : "");
  const [submittedSearchValue, setSubmittedSearchValue] = useState<string | undefined>(searchValue);
  const [pageValue, setPageValue] = useState<number>(query.page || 0);
  const [searchState, setSearchState] = useState<SearchState>({
    type: "INIT",
  });

  useEffect(() => {
    search(pageValue);
  }, [submittedSearchValue, pageValue]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>Fantasy Premier League Search</title>
        <meta name="description" content="Search for fpl player by name or team name." />
      </Head>
      <Header />
      <div className="flex-grow">
        <div className="py-24 px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
            Search for fpl player
          </h1>
          <p className="text-md md:text-lg text-center text-fpl-purple">
            You can search by name or team name
          </p>

          <form className="mt-10" onSubmit={e => updateSearchValues(0, e)}>
            <input
              aria-label="Search for fpl player"
              value={searchValue}
              placeholder="Magnus Carlsen"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="w-72 py-2 px-4 mr-4 text-fpl-purple border-2 border-fpl-purple rounded focus:outline-none"
            />

            <Button onClick={e => updateSearchValues(0, e)} shape="long" className="mt-4">
              Search
            </Button>
          </form>
        </div>
        <div className="pb-24 px-8 text-center">
          <SearchState
            searchState={searchState}
            searchPhrase={submittedSearchValue}
            page={pageValue}
          />
          <Pagination searchState={searchState} searchPhrase={submittedSearchValue} currentPage={pageValue} updatePage={newPage => updateSearchValues(newPage)}/>
        </div>
      </div>
      <Footer />
    </div>
  );

  function updateSearchValues(page: number, event?: any){
    if (event) {
      event.preventDefault();
    }
    setSubmittedSearchValue(searchValue);
    setPageValue(page);
    updateQueryParam(searchValue, page);
  }

  function search(page: number) {
    if (submittedSearchValue === "") {
      setSearchState({ type: "EMPTY" });
      return;
    }
    searchForPlayer(submittedSearchValue, page).then((res) => {
      setSearchState(res);
    });
  }
}

Index.getInitialProps = ({ query }) => {
  return query;
};

export default Index;

interface SearchStateProps {
  searchState: SearchState;
  searchPhrase: string;
  page: number;
}

const updateQueryParam = (searchValue: string, page: number) => {
  Router.push(
    {
      pathname: "/search",
      query: { search: encodeURI(searchValue), page: page },
    },
    undefined,
    {
      shallow: true,
      scroll: false
    }
  );
}

const SearchState = ({ searchState, searchPhrase, page }: SearchStateProps) => {
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
        page={page}
      />
    );
  }
};

interface ResultTableProps {
  playerEntries: PlayerEntry[];
  searchPhrase: string;
  page: number;
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
                {data.realName}&nbsp;{data.verifiedType !== null ? <img src="/check.svg" className="verified-icon" alt="Verified team" title={getVerifiedHelpText(data.verifiedType)}/> : null}
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

interface PaginationProps {
  searchState: SearchState;
  searchPhrase: string;
  currentPage: number;
  updatePage: (newPage: number) => void;
}

const Pagination = ({searchState, searchPhrase, currentPage, updatePage}: PaginationProps) => {

  const prevPage = +currentPage - 1;
  const nextPage = +currentPage + 1;

  function paginate(e, page){
    e.preventDefault();
    updatePage(page);
  }

  if (searchState.type === "SUCCESS" && (searchState.hasPrev || searchState.hasNext)){
    return (
      <div>
        <p className="mb-4">Page {+currentPage + 1} of {searchState.totalPages}</p>
        <div>
          {searchState.hasPrev ? <a href={`?search=${searchPhrase}&page=${prevPage}`} onClick={e => paginate(e, prevPage)} className="font-bold rounded shadow hover:shadow-xl transition duration-500 py-2 px-8 text-white bg-fpl-purple mt-4 mr-2">Prev</a> : null}
          {searchState.hasNext ? <a href={`?search=${searchPhrase}&page=${nextPage}`} onClick={e => paginate(e, nextPage)} className="font-bold rounded shadow hover:shadow-xl transition duration-500 py-2 px-8 text-white bg-fpl-purple mt-4">Next</a> : null}
        </div>
      </div>
    )
  }
  return null;
}

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

const getVerifiedHelpText = (verifiedType: VerifiedType) => {
  switch (verifiedType) {
    case VerifiedType.FootballerInPL: return "That guy in Premier League";
    case VerifiedType.Footballer: return "That famous football player";
    case VerifiedType.ChessMaster: return "That chess champion";
    case VerifiedType.Podcaster: return "That voice on the podcast thing";
    case VerifiedType.CommunityFame: return "That person on Twitter";
    case VerifiedType.Actor: return "That actor";
    case VerifiedType.TvFace: return "That TV face";
    case VerifiedType.Athlete: return "That famous athlete";
    default: return null;
  }
}