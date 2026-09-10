import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "@/styles/pilot.css";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PremiumIB | Windsor-Essex Insurance Brokers",
  description:
    "Compare insurance options with help from a real broker — not a call centre.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-offwhite font-sans text-charcoal">
        {children}
        <Footer />
      </body>
    </html>
  );
}
