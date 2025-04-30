import React from "react";
import { WhiteBlock } from "../white-block";
import { Input, Textarea } from "@/components/ui";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
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
  );
};
