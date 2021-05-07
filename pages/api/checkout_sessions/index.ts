import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { priceId } = req.body;

    if (!priceId) {
      res.status(400);
      return res.send({
        error: {
          message: "Empty priceId!",
        },
      });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        success_url:
          "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/checkout/cancelled",
      });

      res.send({
        sessionId: session.id,
      });
    } catch (e) {
      res.status(400);
      return res.send({
        error: {
          message: e.message,
        },
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
