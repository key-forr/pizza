import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * функція для підрахунку загальної вартості піци
 * @param type тип(варіант) тіста
 * @param size розмір піци
 * @param items список варіацій
 * @param ingredients інгредієнти
 * @param selectedIngredients вибрані інгредієнти
 * @returns number загальна ціна
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType == type && item.size == size)?.price ||
    0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
