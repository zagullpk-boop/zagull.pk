import { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Log in to your ZAGULL account to manage your orders, wishlist, and shipping addresses.",
};

export default function Login() {
  return <LoginPage />;
}
