import Head from "next/head";
import React from "react";
import Stripe from "stripe";
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

        <div>
          {plans.map((plan) => {
            return (
              <div className="flex flex-col items-center lg:inline-grid bg-white rounded-lg m-10">
                <div className="p-3 m-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-fpl-purple mb-2">
                    {plan.product.name}
                  </h1>
                  <div className="border border-gray-100 mb-2"></div>

                  <img
                    className="m-auto"
                    src={plan.product.images[0]}
                    alt={plan.product.name}
                    width={100}
                    height={100}
                  />

                  <div className="text-3xl pt-10">
                    {formatAmount(plan.price.unit_amount, plan.price.currency)}
                  </div>
                  <span>monthly</span>

                  <dl className="my-10">
                    <MetaDataListItem
                      title="Workspaces"
                      metadata={plan.product.metadata}
                    />
                    <MetaDataListItem
                      title="Events"
                      metadata={plan.product.metadata}
                    />
                    <MetaDataListItem
                      title="Days"
                      metadata={plan.product.metadata}
                    />
                    <MetaDataListItem
                      title="Platforms"
                      metadata={plan.product.metadata}
                    />
                  </dl>
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
    </div>

    <Footer />
  </div>
);

interface MetaDataListItemProps {
  title: string;
  metadata: Stripe.Metadata;
}

const MetaDataListItem = ({ title, metadata }: MetaDataListItemProps) => (
  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-gray-200 border-b-2 border-opacity-60">
    <dt className="text-sm font-medium text-gray-500">{title}</dt>
    <dd className="mt-1 font-bold text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {metadata[title]}
    </dd>
  </div>
);

CheckoutPage.getInitialProps = async () => {
  const res = await getPlans();

  if (res.type === "SUCCESS") {
    const sorted = res.plans?.sort(
      (a, b) => a.price.unit_amount! - b.price.unit_amount!
    );
    return {
      plans: sorted,
    };
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

function formatAmount(amount: number | null, currency: string): string {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });

  if (amount) return numberFormat.format(amount / 100);
  return numberFormat.format(0);
}
