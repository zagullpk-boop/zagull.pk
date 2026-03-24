import { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the ZAGULL team for order inquiries, collaborations, or general questions. We're based in Faisalabad and always happy to help.",
};

export default function Contact() {
  return <ContactPage />;
}
