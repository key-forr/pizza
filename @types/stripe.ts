import { Stripe } from "stripe";

export type StripeWebhookData = {
  id: string;
  object: string;
  api_version: string;
  created: number;
  data: {
    object: Stripe.PaymentIntent;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type: string;
};

export interface StripeMetadata {
  order_id: string;
  email?: string;
}
