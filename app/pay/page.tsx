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

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg font-medium">Обробка платежу...</p>
        <p className="text-sm text-gray-500 mt-2">
          Будь ласка, зачекайте. Не закривайте цю сторінку.
        </p>
      </div>
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const clientSecret = searchParams.get("client_secret") ?? "";

  const amount = searchParams.get("amount");
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setIsProcessing(true);

    try {
      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000/payment-success?amount=${amount}&email=${email}`,
          },
          redirect: "if_required",
        });

      if (confirmError) {
        setMessage(confirmError.message ?? "Щось пішло не так");
        setIsProcessing(false);
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        window.location.href = `http://localhost:3000/payment-success?amount=${amount}&email=${email}&payment_intent=${paymentIntent.id}`;
        return;
      }

      const { paymentIntent: retrievedIntent } =
        await stripe.retrievePaymentIntent(clientSecret);

      if (retrievedIntent) {
        switch (retrievedIntent.status) {
          case "succeeded":
            window.location.href = `http://localhost:3000/payment-success?amount=${amount}&email=${email}&payment_intent=${retrievedIntent.id}`;
            return;
          case "processing":
            setMessage(
              "Оплата обробляється. Ми перенаправимо вас автоматично після завершення."
            );
            startPollingPaymentStatus(retrievedIntent.id);
            break;
          case "requires_payment_method":
            setMessage("Оплата не пройшла. Будь ласка, спробуйте ще раз.");
            setIsProcessing(false);
            break;
          default:
            setMessage("Щось пішло не так. Будь ласка, спробуйте ще раз.");
            setIsProcessing(false);
            break;
        }
      } else {
        setMessage(
          "Не вдалося перевірити статус платежу. Будь ласка, спробуйте ще раз."
        );
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Помилка під час обробки платежу");
      setIsProcessing(false);
    }

    setIsLoading(false);
  };

  const startPollingPaymentStatus = (paymentIntentId: string) => {
    const pollInterval = setInterval(async () => {
      if (!stripe) return;

      try {
        const { paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret);

        if (paymentIntent && paymentIntent.status === "succeeded") {
          window.location.href = `http://localhost:3000/payment-success?amount=${amount}&email=${email}&payment_intent=${paymentIntent.id}`;
          return;
        } else if (
          paymentIntent &&
          (paymentIntent.status === "canceled" ||
            paymentIntent.status === "requires_payment_method")
        ) {
          clearInterval(pollInterval);
          setMessage("Платіж не пройшов. Будь ласка, спробуйте ще раз.");
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error polling payment status:", error);
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(pollInterval);
      setMessage(
        "Час очікування результату платежу вичерпано. Будь ласка, перевірте статус вашого замовлення."
      );
      setIsProcessing(false);
    }, 60000);
  };

  return (
    <>
      {isProcessing && <LoadingOverlay />}
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
    </>
  );
}

function PaymentPageLoader() {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow rounded bg-white">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function PayPage() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const [ready, setReady] = useState(false);

  const appearance = {
    theme: "stripe" as const,
  };

  useEffect(() => {
    const secretFromUrl = searchParams.get("client_secret");
    if (secretFromUrl) {
      setClientSecret(secretFromUrl);
      setTimeout(() => setReady(true), 500);
    }
  }, [searchParams]);

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
      {!ready ? (
        <PaymentPageLoader />
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance,
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
