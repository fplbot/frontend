import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import SimpleHeader from "../components/Menu";
import { Spinner } from "../components/Spinner";
import {
  searchAny,
  SearchResponse,
  SearchSuccess,
  LeagueEntry,
  PlayerEntry,
} from "../services/searchAny";
import { VerifiedType } from "../services/VerifiedType";

interface SearchInit {
  type: "INIT";
}

interface SearchEmpty {
  type: "EMPTY";
}

interface SearchLoading {
  type: "LOADING";
  prevData?: SearchSuccess;
}

type SearchState = SearchResponse | SearchLoading | SearchEmpty | SearchInit;

interface SearchIndexProps {
  query: { q: string | null; page: string | null };
}

function SearchIndex({ query }: SearchIndexProps) {
  const [searchValue, setSearchValue] = useState<string>(
    query.q ? decodeURI(query.q) : ""
  );
  const [submittedSearchValue, setSubmittedSearchValue] = useState<string>(
    searchValue
  );
  const [pageValue, setPageValue] = useState<number>(
    query.page ? parseInt(query.page, 10) : 0
  );
  const [searchState, setSearchState] = useState<SearchState>({
    type: query.q ? "LOADING" : "INIT",
  });

  useEffect(() => {
    search();
  }, [submittedSearchValue, pageValue]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef == null || inputRef.current == null) return;
    inputRef.current.focus();
    if (submittedSearchValue) {
      inputRef.current.select();
    }
  }, [submittedSearchValue]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
      <Head>
        <title>Fantasy Premier League Search</title>
        <meta
          name="description"
          content="Search for Fantasy Premier League content. Search managers, teams or leagues."
        />
      </Head>
      <SimpleHeader />
      <div className="flex-grow">
        <div className="w-full max-w-2xl m-auto py-24 px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
            Search FPL content
          </h1>
          <p className="text-md md:text-lg text-center text-fpl-purple">
            Search managers or leagues. Also feel free to check out our
            virtual leagues — for example{" "}
            <Link href="/virtual-leagues/pl">
              <a className="underline">verified PL players playing FPL</a>
            </Link>
            .
          </p>

          <form className="mt-10" onSubmit={submitSearchValue}>
            <input
              aria-label="Search for FPL player"
              value={searchValue}
              placeholder="Magnus Carlsen"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              ref={inputRef}
              className="search-input w-72 py-2 px-4 text-fpl-purple border-2 border-fpl-purple rounded focus:outline-none"
            />

            <Button onClick={submitSearchValue} shape="long" className="mt-4">
              Search
            </Button>
          </form>
        </div>
        <div className="pb-16 px-8 text-center">
          <SearchState
            searchState={searchState}
            searchPhrase={submittedSearchValue}
            page={pageValue}
            updatePage={updatePageNumber}
          />
        </div>
      </div>
      <Footer />
    </div>
  );

  function submitSearchValue(event?: any) {
    if (event) {
      event.preventDefault();
    }
    setSubmittedSearchValue(searchValue);
    setPageValue(0);
    updateQueryParam(searchValue, 0);
  }

  function updatePageNumber(page: number) {
    setPageValue(page);
    updateQueryParam(submittedSearchValue, page);
  }

  function search() {
    if (submittedSearchValue === "") {
      setSearchState({ type: "EMPTY" });
      return;
    }
    setSearchState({
      type: "LOADING",
      prevData: searchState.type === "SUCCESS" ? searchState : undefined,
    });
    searchAny(submittedSearchValue, pageValue).then((res) => {
      setSearchState(res);
    });
  }
}

SearchIndex.getInitialProps = async (ctx: NextPageContext) => {
  return {
    query: ctx.query,
  };
};

export default SearchIndex;

interface SearchStateProps {
  searchState: SearchState;
  searchPhrase: string;
  page: number;
  updatePage: (newPage: number) => void;
}

const updateQueryParam = (searchValue: string, page: number) => {
  Router.push(
    {
      pathname: "/search",
      query: { q: encodeURI(searchValue), page: page },
    },
    undefined,
    {
      shallow: true,
      scroll: false,
    }
  );
};

const SearchState = ({
  searchState,
  searchPhrase,
  page,
  updatePage,
}: SearchStateProps) => {
  if (searchState.type === "LOADING") {
    if (searchState.prevData) {
      return (
        <ResultTable
          searchState={searchState.prevData}
          searchPhrase={searchPhrase}
          page={page}
          updatePage={updatePage}
          loading={true}
        />
      );
    }

    return (
      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (searchState.type === "SUCCESS") {
    return (
      <ResultTable
        searchState={searchState}
        searchPhrase={searchPhrase}
        page={page}
        updatePage={updatePage}
        loading={false}
      />
    );
  }
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
  return (
    <p className="text-fpl-purple">Ooops, looks like something went wrong 🤕</p>
  );
};

interface ResultTableProps {
  searchState: SearchSuccess;
  searchPhrase: string;
  page: number;
  updatePage: (newPage: number) => void;
  loading: boolean;
}

const ResultTable = ({
  searchState,
  searchPhrase,
  page,
  updatePage,
  loading,
}: ResultTableProps) => {
  if (searchState.data.length < 1) {
    return (
      <p className="text-fpl-purple">
        Search for "{searchPhrase}" did not return any matches
      </p>
    );
  }

  return (
    <div className="w-full max-w-3xl m-auto">
      {loading ? (
        <div className="flex justify-center h-12 mb-4">
          <Spinner size="lg" />
        </div>
      ) : (
        <p className="text-fpl-purple text-xl md:text-xl text-center mb-4 h-12">
          Search results for "{searchPhrase}"
        </p>
      )}

      <Pagination
        searchState={searchState}
        searchPhrase={searchPhrase}
        currentPage={page}
        updatePage={updatePage}
      />
      <div className="pt-3">
        {searchState.data.map((data, i) => (
          <div
            key={`table-row-${i}`}
            className={
              "flex border-grey-light border rounded-lg p-5 mb-1 truncate " +
              (data.type == "entry"
                ? "bg-white hover:bg-gray-100"
                : data.type == "league"
                ? "bg-white hover:bg-gray-100"
                : "")
            }
          >
            {data.type == "entry" && <PlayerEntryRow item={data.source} />}
            {data.type == "league" && <LeagueEntryRow item={data.source} />}
          </div>
        ))}
      </div>
    </div>
  );
};

interface PlayerEntryRowProps {
  item: PlayerEntry;
}

const PlayerEntryRow = ({ item }: PlayerEntryRowProps) => (
  <Row
    icon="⚽️"
    title={item.realName}
    subText={item.realName}
    linkHref={`https://fantasy.premierleague.com/entry/${item.id}/history/`}
  >
    <>
      {item.verifiedType && (
        <img
          src="/check.svg"
          className="verified-icon mr-1 ml-1"
          alt="Verified team"
          title={getVerifiedHelpText(item.verifiedType)}
        />
      )}
      {item.alias && (
        <>
          <span className="alias hidden sm:inline-block">
            (aka {item.alias})
          </span>
        </>
      )}
    </>
  </Row>
);

interface LeagueEntryRowProps {
  item: LeagueEntry;
}

const LeagueEntryRow = ({ item }: LeagueEntryRowProps) => (
  <Row
    icon="📊"
    title={item.name}
    subText={item.adminName}
    linkHref={`/leagues/${item.id}`}
  />
);

interface RowProps {
  icon: string;
  children?: string | JSX.Element;
  title: string | JSX.Element;
  subText: string;
  linkHref: string;
}

const Row = ({ icon, title, subText, linkHref, children }: RowProps) => (
  <>
    <div>
      <Icon>{icon}</Icon>
    </div>
    <div>
      <span className="mr-1">
        <span className="font-bold">{title}</span>
        {children}
      </span>
      <span className="text-sm hidden sm:inline-block">{subText}</span>
    </div>
    <div className="w-full flex justify-end mr-3">
      <a href={linkHref} className="underline">
        View
      </a>
    </div>
  </>
);

type IconProps = {
  children: string | JSX.Element;
};
const Icon = ({ children }: IconProps) => (
  <span className="verified-icon w-15 h-15 p-3">{children}</span>
);

interface PaginationProps {
  searchState: SearchSuccess;
  searchPhrase: string;
  currentPage: number;
  updatePage: (newPage: number) => void;
}

const Pagination = ({
  searchState,
  searchPhrase,
  currentPage,
  updatePage,
}: PaginationProps) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  function paginate(e: any, page: number) {
    e.preventDefault();
    updatePage(page);
  }

  if (searchState.hasPrev || searchState.hasNext) {
    return (
      <div className="flex items-center justify-center md:justify-end text-fpl-purple ">
        {searchState.hasPrev && (
          <a
            href={`?search=${searchPhrase}&page=${prevPage}`}
            onClick={(e) => paginate(e, prevPage)}
            className="font-bold underline"
          >
            Prev
          </a>
        )}
        <p className="mx-4">
          Page {currentPage + 1} of {searchState.totalPages}
        </p>
        {searchState.hasNext && (
          <a
            href={`?search=${searchPhrase}&page=${nextPage}`}
            onClick={(e) => paginate(e, nextPage)}
            className="font-bold underline "
          >
            Next
          </a>
        )}
      </div>
    );
  }
  return null;
};

const getVerifiedHelpText = (verifiedType: VerifiedType): string => {
  switch (verifiedType) {
    case "FootballerInPL":
      return "That guy in Premier League";
    case "Footballer":
      return "That famous football player";
    case "ChessMaster":
      return "That chess champion";
    case "Podcaster":
      return "That voice on the podcast thing";
    case "CommunityFame":
      return "That person on Twitter";
    case "Actor":
      return "That actor";
    case "TvFace":
      return "That TV face";
    case "Athlete":
      return "That famous athlete";
    case "Unknown":
      return "Not sure who this is";
  }
};
