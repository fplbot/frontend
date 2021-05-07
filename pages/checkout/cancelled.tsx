import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";

const CheckoutCancelled = () => (
  <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
    <Head>
      <title>Checkout</title>
      <meta name="description" content="Checkout" />
    </Head>
    <SimpleHeader />
    <div className="flex-grow">
      <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
          No worries!
        </h1>
        <a href="/checkout" className="underline">Back to checkout</a>
      </div>
    </div>
    <Footer />
  </div>
);

export default CheckoutCancelled;
