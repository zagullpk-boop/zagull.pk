import { Metadata } from "next";
import ShopPage from "./ShopPage";

export const metadata: Metadata = {
  title: "Shop ZAGULL | Nature-Inspired Jewellery & Clothing",
  description: "Browse ZAGULL's curated collection of artificial jewellery, girls' clothing, and customized gift baskets. Premium quality from Faisalabad with nationwide COD.",
};

export default function Shop() {
  return <ShopPage />;
}
