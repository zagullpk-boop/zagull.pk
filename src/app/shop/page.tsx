import { Metadata } from "next";
import ShopPage from "./ShopPage";

export const metadata: Metadata = {
  title: "Shop All Collections",
  description: "Browse ZAGULL's nature-inspired artificial jewellery, clothing, and gift baskets. Shop our latest pendants, rings, and more with nationwide COD.",
};

export default function Shop() {
  return <ShopPage />;
}
