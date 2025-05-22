import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onClose?: VoidFunction;
}

export const LoginFrom: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: TFormLoginValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      ></form>
    </FormProvider>
  );
};
