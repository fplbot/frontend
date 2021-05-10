import Stripe from "stripe";

interface StripeServerFailure {
  type: "ERR";
}

interface StripeListPricesSuccess {
  type: "SUCCESS";
  prices: Stripe.Price[];
}

interface StripeListProductsSuccess {
  type: "SUCCESS";
  products: Stripe.Product[];
}

export type StripeListPricesResponse =
  | StripeServerFailure
  | StripeListPricesSuccess;

export type StripeListProductsResponse =
  | StripeServerFailure
  | StripeListProductsSuccess;

interface PriceContainer {
  data: Stripe.Price[];
}

interface ProductContainer {
  data: Stripe.Product[];
}

export async function listPrices(): Promise<StripeListPricesResponse> {
  try {
    const response = await fetch("https://api.stripe.com/v1/prices", {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });

    if (response.ok) {
      const json: PriceContainer = await response.json();
      return {
        type: "SUCCESS",
        prices: json.data,
      };
    } else {
      return await Promise.reject(response);
    }
  } catch (err) {
    return {
      type: "ERR",
    };
  }
}

export async function getProducts(): Promise<StripeListProductsResponse> {
  try {
    const response = await fetch("https://api.stripe.com/v1/products", {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });

    if (response.ok) {
      const json: ProductContainer = await response.json();
      return {
        type: "SUCCESS",
        products: json.data,
      };
    } else {
      return await Promise.reject(response);
    }
  } catch (err) {
    return {
      type: "ERR",
    };
  }
}

export interface Plan {
  product: Stripe.Product;
  price: Stripe.Price;
}

export interface GetPlansSuccess {
  type: "SUCCESS";
  plans: Plan[];
}

export type GetPlansResponse = StripeServerFailure | GetPlansSuccess;

export async function getPlans(): Promise<GetPlansResponse> {
  const productsRes = await getProducts();
  const pricesRes = await listPrices();

  if (productsRes.type === "SUCCESS" && pricesRes.type === "SUCCESS") {
    const plans = pricesRes.prices
      .map((price: Stripe.Price) => {
        const productForPrice = productsRes.products.find(
          (product: Stripe.Product) => product.id == price.product
        );
        return {
          product: productForPrice,
          price: price,
        };
      })
      .filter(
        (el) => el.product !== null && el.product !== undefined
      ) as Plan[];

    return {
      type: "SUCCESS",
      plans: plans,
    };
  } else {
    return {
      type: "ERR",
    };
  }
}
