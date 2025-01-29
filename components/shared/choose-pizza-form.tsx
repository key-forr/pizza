import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const textDetaills = "30cм, традиційне тісто 30, 590г";
  const totalPrice = 350;
  const size = 30;

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Додати в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
