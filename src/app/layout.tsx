import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PremiumIB | Windsor-Essex Insurance Brokers",
  description:
    "Compare insurance options with help from a real local broker — not a call centre.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-offwhite font-sans text-charcoal">
        {children}
      </body>
    </html>
  );
}
