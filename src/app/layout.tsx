import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/seo";
import "@/styles/pilot.css";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} | Personal & Business Insurance in Windsor-Essex`,
    template: `%s`,
  },
  description:
    "Independent insurance brokerage in Windsor-Essex. Personal and business coverage through a licensed local broker — not a call centre.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE_PATH }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
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
