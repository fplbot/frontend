interface StripeFail {
  type: "ERR";
}

interface StripeSuccess {
  type: "SUCCESS";
  sessionId: string;
}

export type StripeResponse = StripeFail | StripeSuccess;

export async function createStripeCheckoutSession(priceId: string) {
  return await http("/api/checkout_sessions", { priceId: priceId });
}

async function http(url: string, body: any): Promise<StripeResponse> {
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
      let json = await response.json();
      return {
        type: "SUCCESS",
        sessionId: json.sessionId,
      };
    } else {
      return await Promise.reject(response);
    }
  } catch (error) {
    return { type: "ERR" };
  }
}
