"use server";

import { PayOrderTemplate } from "@/components/shared";
import { CheckoutFormValues } from "@/constants/checkout-form-schema";
import { sendEmail } from "@/lib";
import { createStripePayment } from "@/lib/create-payment";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Очищаємо кошик після створення замовлення
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id },
    });

    // Створюємо платіж у Stripe
    const paymentIntent = await createStripePayment(
      order.id,
      order.totalAmount,
      order.email
    );

    const clientSecret = paymentIntent.client_secret;

    // Формуємо URL для сторінки оплати
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay?client_secret=${clientSecret}&amount=${order.totalAmount}&email=${encodeURIComponent(order.email)}`;

    // Зберігаємо ID платежу в замовленні
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentIntent.id },
    });

    // Відправляємо email з посиланням на оплату
    await sendEmail(
      data.email,
      "DEPIZZA | Оплатіть замовлення",
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    return paymentUrl;
  } catch (err) {
    console.error("[CreateOrder] Server error", err);
    throw err; // Пробрасываем ошибку для обработки на клиенте
  }
}
