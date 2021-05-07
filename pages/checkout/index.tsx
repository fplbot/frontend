import Head from "next/head";
import React from "react";
import Stripe from "stripe";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";
import { createStripeCheckoutSession } from "../../services/stripeBrowser";
import { getProducts, listPrices } from "../../services/stripeServer";
import getStripe from "../../utils/getStripe";

interface ProductWithPrice {
  product: Stripe.Product;
  price: Stripe.Price;
}

interface CheckoutPageProps {
  plans: ProductWithPrice[];
}

const CheckoutPage = ({ plans }: CheckoutPageProps) => (
  <div className="flex flex-col min-h-screen bg-gradient-to-tr from-white to-gray-200">
    <Head>
      <title>Checkout</title>
      <meta name="description" content="Checkout" />
    </Head>
    <SimpleHeader />
    <div className="flex-grow">
      <div className="w-full max-w-7xl m-auto mt-4 mb-14 px-8 text-center">
        <Breadcrumbs
          breadcrumbs={[{ title: "Home", href: "/" }, { title: "Checkout" }]}
        />

        {plans.map((plan) => {
          return (
            <div className="">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
                  {plan.product.name}
                </h1>
              </div>
              <div className="m-3 p3">
                <CheckoutSubscription
                  priceId={plan.price.id}
                  title={plan.product.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <Footer />
  </div>
);

CheckoutPage.getInitialProps = async () => {
  var res = await getProducts();
  if (res.type == "SUCCESS") {
    var pricesRes = await listPrices();
    if (pricesRes.type == "SUCCESS") {
      const plans = pricesRes.prices?.map((price: Stripe.Price) => {
        var productForPrice = res.products?.filter(
          (product: Stripe.Product) => product.id == price.product
        )[0];
        return {
          product: productForPrice,
          price: price,
        };
      });
      return { plans: plans };
    }
  }

  return {
    plans: [],
  };
};

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
function getPrices() {
  throw new Error("Function not implemented.");
}
