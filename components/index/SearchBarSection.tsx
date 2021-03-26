import Link from 'next/link';
import { useEffect, useRef } from "react";
import Button from "../Button";

export default function SearchBarSection() {

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef == null || inputRef.current == null) return;
    inputRef.current.focus();
  }, []);

  return (
    <section className="search-promotion">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-fpl-purple mb-4">
          Try our search 🕵️
        </h1>
        <p className="text-lg text-center text-fpl-purple mt-4 mb-4">
          Search Fantasy&nbsp;Premier&nbsp;League for managers or leagues. Also feel free to check out our virtual league of <Link href="/virtual-leagues/pl"><a className="underline">verified PL players playing FPL</a></Link>.
        </p>
        <form className="search-bar" action="/search">
          <input
            ref={inputRef}
            name="q"
            placeholder="Magnus Carlsen"
            aria-label="Search for fpl player"
            className="search-input w-72 py-2 px-4 text-fpl-purple border-2 border-fpl-purple rounded focus:outline-none"
          />
          <Button onClick={() => {}} shape="long" className="mt-4">
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
