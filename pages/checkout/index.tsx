import Head from "next/head";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/Menu";
import { createStripeCheckoutSession } from "../../services/stripeBrowser";
import { getPlans, Plan } from "../../services/stripeServer";
import getStripe from "../../utils/getStripe";


interface CheckoutPageProps {
  plans: Plan[];
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
                <h1 className="text-2xl md:text-xl font-bold text-fpl-purple mb-2">
                  {plan.product.name}
                </h1>
              </div>
              <div className="m-3 p3 pb-10">
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
  const res = await getPlans();

  if (res.type === "SUCCESS") {
    return {
      plans: res.plans
    }
  }

  return {
    type: "ERR",
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
  const onClick = async (e: any) => {
    e.preventDefault();
    const createSessionResponse = await createStripeCheckoutSession(priceId);

    if (createSessionResponse.type === "SUCCESS") {
      const stripe = await getStripe();
      if (stripe == null) {
        console.warn("Failed to load stripe 🤷‍♂️");
        return;
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: createSessionResponse.sessionId,
      });
      console.warn(error.message);
    } else {
      console.warn("Could not redirect to Stripe 🤷‍♂️");
    }
  };

  return (
    <>
      <Button onClick={onClick}>
        <>Subscribe to {title}</>
      </Button>
    </>
  );
};
