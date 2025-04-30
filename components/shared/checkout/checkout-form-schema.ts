import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Ім'я повинно містити не менше 2-х символів" }),
  lastName: z
    .string()
    .min(1, { message: "Прізвище повинно містити не менше 2-х символів" }),
  email: z.string().email({ message: "Введіть коректну почту" }),
  phone: z.string().min(10, { message: "Введіть коректний номер телефону" }),
  address: z.string().min(5, { message: "Введіть коректний адрес" }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
