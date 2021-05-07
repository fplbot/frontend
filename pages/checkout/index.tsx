import Head from "next/head";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";
import { createStripeCheckoutSession } from "../../services/stripe";
import getStripe from "../../utils/getStripe";

const CheckoutPage = () => (
  <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
    <Head>
      <title>Checkout</title>
      <meta name="description" content="Checkout" />
    </Head>
    <SimpleHeader />
    <div className="flex-grow">
      <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
        <Breadcrumbs
          breadcrumbs={[{ title: "Home", href: "/" }, { title: "Checkout" }]} />
        <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
          Select products
        </h1>

        <div className="m-3 p3">
          <CheckoutSubscription
            priceId="price_1IoQwDJwEOUXxiyrMmyMORES"
            title="Free plan" />
        </div>
        <div className="m-3 p3">
          <CheckoutSubscription
            priceId="price_1IoQzMJwEOUXxiyrE4dsHNki"
            title="Paid plan" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default CheckoutPage;

interface CheckoutSubscriptionProps {
  priceId: string;
  title: string;
}

const CheckoutSubscription = ({
  priceId,
  title,
}: CheckoutSubscriptionProps) => {
  const onClick = async (e: any, priceId: string) => {
    e.preventDefault();
    const createSessionResponse = await createStripeCheckoutSession(priceId);

    if (createSessionResponse.type == "SUCCESS") {
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: createSessionResponse.sessionId,
      });
      console.warn(error.message);
    } else {
      console.warn("Could not redirect to Stripe 🤷‍♂️");
    }
  };

  return (
    <>
      <Button onClick={(e) => onClick(e, priceId)}>
        <>Subscribe to {title}</>
      </Button>
    </>
  );
};
