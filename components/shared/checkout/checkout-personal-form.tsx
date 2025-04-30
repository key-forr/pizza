import React from "react";
import { WhiteBlock } from "../white-block";
import { Input } from "@/components/ui";
import { FormInput } from "../form";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональні дані">
      <div className="grid grid-cols-2 gap-5">
        <Input name="firstName" className="text-base" placeholder="Ім'я" />
        <Input name="lastName" className="text-base" placeholder="Прізвище" />
        <Input name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
