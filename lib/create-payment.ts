// lib/create-payment.ts
import Stripe from "stripe";

export async function createStripePayment(
  orderId: number,
  amount: number,
  email: string
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });

  // Створення платіжного наміру
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // конвертація в копійки
    currency: "uah",
    description: `Оплата замовлення №${orderId}`,
    metadata: {
      order_id: String(orderId),
      email: email,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return paymentIntent;
}
