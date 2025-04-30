"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
  FormInput,
} from "@/components/shared";
import { Input, Textarea } from "@/components/ui";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { useCart } from "@/hooks";
import { getCartItemDetails } from "@/lib";

export default function CheckoutPage() {
  const { updateItemQuantity, totalAmount, items, removeCartItem } = useCart();

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформлення замовлення"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        {/*Ліва частина*/}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="2. Персональні дані">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="Ім'я"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Прізвище"
              />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <FormInput
                name="phone"
                className="text-base"
                placeholder="Телефон"
              />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адреса доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="Введіть адрес доставки"
              />
              <Textarea
                className="text-base"
                placeholder="Коментар до замовлення"
                rows={5}
              />
            </div>
          </WhiteBlock>
        </div>

        {/*Права частина*/}
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
