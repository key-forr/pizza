"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Завантажуємо Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const amount = searchParams.get("amount");
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}&email=${email}`,
      },
    });

    if (error) {
      setMessage(error.message ?? "Щось пішло не так");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-6 shadow rounded bg-white"
    >
      <PaymentElement />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {isLoading ? "Оплата..." : "Оплатити"}
      </button>
      {message && <div className="mt-2 text-red-500">{message}</div>}
    </form>
  );
}

export default function PayPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("client_secret");
  const [ready, setReady] = useState(false);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    if (clientSecret) setReady(true);
  }, [clientSecret]);

  if (!clientSecret) {
    return (
      <div className="text-center mt-10 text-red-500">
        Немає client_secret у URL
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">Оплата замовлення</h1>
      {ready && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
