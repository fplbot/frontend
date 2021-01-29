import React from "react";
import Features from "../components/index/Features";
import Header from "../components/index/Header";
import AddToSlackForm from "../components/index/AddToSlackForm";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <div>
      <Header />
      <Features />
      <AddToSlackForm />
      <a
        href={"/search"}
        className="text-md md:text-lg text-fpl-purple"
      >
        <div className="flex flex-col md:flex-row items-center bg-white px-12 py-8 md:py-24">
          <div className="md:pr-4 pb-4 md:w-1/3">
            <h1 className="text-4xl md:text-5xl font-bold text-fpl-purple pb-2">
              New!
            </h1>
            Check out our search function ➡️
          </div>
          <div className="md:w-2/3">
            <img
              src="/search.png"
              className="rounded-lg"
              alt="search-function"
            />
          </div>
        </div>
      </a>
      <Footer />
    </div>
  );
}
