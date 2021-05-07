import Stripe from "stripe";

interface StripeFail {
  type: "ERR";
}

interface StripeSessionCreateSuccess {
  type: "SUCCESS";
  sessionId: string;
}

interface StripeHttpRes {
  sessionId: string;
}

export type StripeSessionCreateResponse =
  | StripeFail
  | StripeSessionCreateSuccess;

export async function createStripeCheckoutSession(priceId: string) {
  return await httpPost("/api/checkout_sessions", { priceId: priceId });
}



async function httpPost(
  url: string,
  body: any
): Promise<StripeSessionCreateResponse> {
  try {
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",

      body: JSON.stringify(body),
    });
    if (response.ok) {
      let json: StripeHttpRes = await response.json();
      return {
        type: "SUCCESS",
        sessionId: json.sessionId,
      };
    } else {
      return await Promise.reject(response);
    }
  } catch (error) {
    return {
      type: "ERR",
    };
  }
}
