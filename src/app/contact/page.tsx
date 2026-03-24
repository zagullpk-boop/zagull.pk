import { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact ZAGULL | 24/7 WhatsApp Support",
  description: "Questions about your order or our collections? Message the ZAGULL team on WhatsApp or use our contact form. We're here to help you 24/7.",
};

export default function Contact() {
  return <ContactPage />;
}
