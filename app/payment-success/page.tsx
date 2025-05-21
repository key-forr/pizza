"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const totalAmount = searchParams.get("amount");
  const email = searchParams.get("email");
  const date = new Date().toLocaleString("uk-UA");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <CheckIcon className="text-green-500 h-16 w-16" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">
            Оплата пройшла успішно
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Дякуємо за оплату. Ваше замовлення обробляється.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Сума:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">
              ₴{totalAmount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Email:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Дата й час:
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {date}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Повернутись на головну
          </Link>
        </div>
      </Card>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
