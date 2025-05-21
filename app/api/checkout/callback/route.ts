// app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { OrderSuccessTemplate } from "@/components/shared/email-templates/order-success";
import { sendEmail } from "@/lib";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// Вимикаємо парсинг body для цього маршруту, щоб отримати raw body для верифікації
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature") as string;

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    // Отримуємо raw body для верифікації
    const rawBody = await req.text();

    let event: Stripe.Event;

    try {
      // Верифікуємо підпис
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Обробляємо різні типи подій
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Отримуємо ID замовлення з метаданих
        const orderId = paymentIntent.metadata.order_id;

        if (!orderId) {
          console.error("Order ID not found in payment metadata");
          return NextResponse.json(
            { error: "Order ID not found in payment metadata" },
            { status: 400 }
          );
        }

        // Знаходимо замовлення
        const order = await prisma.order.findFirst({
          where: {
            id: Number(orderId),
          },
        });

        if (!order) {
          console.error(`Order #${orderId} not found`);
          return NextResponse.json(
            { error: `Order #${orderId} not found` },
            { status: 404 }
          );
        }

        // Оновлюємо статус замовлення на SUCCESS
        await prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: OrderStatus.SUCCEEDED,
          },
        });

        // Відправляємо email про успішне замовлення
        const items = JSON.parse(order.items);

        await sendEmail(
          order.email,
          "DEPIZZA | Ваше замовлення успішно оформлене 🎉",
          OrderSuccessTemplate({
            orderId: order.id,
            items,
          })
        );

        console.log(`✅ Order #${orderId} marked as successful and email sent`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.order_id;

        if (orderId) {
          // Оновлюємо статус замовлення на CANCELLED
          await prisma.order.update({
            where: {
              id: Number(orderId),
            },
            data: {
              status: OrderStatus.CANCELLED,
            },
          });

          console.log(
            `❌ Order #${orderId} marked as cancelled due to payment failure`
          );
        }
        break;
      }
    }

    // Повертаємо 200 для підтвердження отримання
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(`[Stripe Webhook] Error: ${error.message}`);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
