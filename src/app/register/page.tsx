import { Metadata } from "next";
import RegisterPage from "./RegisterPage";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join the ZAGULL community and enjoy a nature-inspired shopping experience with early access to new collections.",
};

export default function Register() {
  return <RegisterPage />;
}
