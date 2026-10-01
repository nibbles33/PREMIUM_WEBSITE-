import AnalyticsProviders from "@/components/analytics/AnalyticsProviders";
import ConsentBootstrapScript from "@/components/consent/ConsentBootstrapScript";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/seo";
import { getGtmId } from "@/lib/analytics/config";
import "@/styles/pilot.css";
import "@/styles/consent.css";
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
  const gtmId = getGtmId();

  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <head>
        <ConsentBootstrapScript />
      </head>
      <body className="flex min-h-full flex-col bg-offwhite font-sans text-charcoal">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <AnalyticsProviders>
          {children}
          <Footer />
        </AnalyticsProviders>
      </body>
    </html>
  );
}
