import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { Viewport } from "next";

import "./globals.css";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME || "Evento"}`,
  description:
    "Evento PŁ to aplikacja PWA stworzona specjalnie dla uczestników wyjazdów organizowanych przez Samorządu Studenckiego Politechniki Łódzkiej, takich jak Adapciak czy Zimowiska. Znajdziesz w niej kompleksowe informacje dotyczące kadry, harmonogramu wycieczki oraz kanał komunikacyjny, zapewniający sprawną wymianę informacji.",
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  icons: [
    {
      url: "/icons/favicon.ico",
      type: "image/x-icon",
    },
    {
      url: "/icons/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      url: "/icons/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      url: "/icons/maskable_icon.png",
      sizes: "512x512",
      type: "maskable",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F9FAFB" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={GeistSans.className}>
      <body className="bg-background text-foreground min-h-screen">
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
