"use server";

import { CheckoutFormValues } from "@/constants/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
  console.log(data);

  const token = "123";

  await prisma.order.create({
    data: {
      token,
      totalAmount: 1500,
      status: OrderStatus.PENDING,
      items: [],
      fullName: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
    },
  });

  return "https://github.com/key-forr/pizza/tree/order";
}
