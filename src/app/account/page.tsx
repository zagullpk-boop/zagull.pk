import { Metadata } from "next";
import AccountPage from "./AccountPage";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your ZAGULL profile, track your orders, and view your wishlist items.",
};

export default function Account() {
  return <AccountPage />;
}
