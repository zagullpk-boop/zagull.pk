import { Metadata } from "next";
import OrderTrackingContent from "./OrderTrackingContent";

export const metadata: Metadata = {
  title: "Track Your Order | ZAGULL LIVE Status",
  description: "Enter your Order ID to get the latest status of your ZAGULL package. Fast delivery across Pakistan with nationwide COD.",
};

export default function OrderTrackingPage() {
  return <OrderTrackingContent />;
}
