import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Замовлення #{orderId}</h1>

    <p>
      Оплатіть замовлення на суму <b>{totalAmount}</b> грн. Перейдіть
      <a href={paymentUrl}> по цій силці</a> для оплати замовлення.
    </p>
  </div>
);
