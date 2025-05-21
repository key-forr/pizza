import axios from "axios";

export async function createStripePayment(orderId: number, amount: number) {
  const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

  const response = await axios.post(
    "https://api.stripe.com/v1/payment_intents",
    new URLSearchParams({
      amount: String(amount * 100), // копійки
      currency: "uah",
      description: `Оплата замовлення №${orderId}`,
      "metadata[order_id]": String(orderId),
      "payment_method_types[]": "card",
    }),
    {
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}
