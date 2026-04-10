import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepWise",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased`}>
        {children}

        <Toaster />

        <Script
          src="https://console.svisor.vn/embed.js"
          strategy="afterInteractive"
          data-api-key="vk_4189915cdf69a97a2d4a0dfafc843323500113998f228fdfe460c13119a08b41"
          data-api-url="https://api-console.svisor.vn"
          data-position="bottom-right"
          data-accent="#14a13e"
        />
      </body>
    </html>
  );
}
