export interface StripeCreatePaymentDetails {
  amount: number;
  description: string;
  orderId: string;
}

export interface StripePaymentIntent {
  id: string;
  object: "payment_intent";
  amount: number;
  currency: string;
  description: string;
  metadata: {
    order_id: string;
    [key: string]: string;
  };
  status: string;
  client_secret: string;
  created: number;
  livemode: boolean;
  payment_method_types: string[];
}
