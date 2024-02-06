import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "ZimowiskApp",
  description:
    "TripApp PŁ to aplikacja PWA stworzona specjalnie dla uczestników wyjazdów organizowanych przez Samorządu Studenckiego Politechniki Łódzkiej, takich jak Adapciak czy Zimowiska. Znajdziesz w niej kompleksowe informacje dotyczące kadry, harmonogramu wycieczki oraz kanał komunikacyjny, zapewniający sprawną wymianę informacji.",
  generator: "Next.js",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#fff" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="mx-6 sm:mx-10 md:mx-20 lg:mx-24">{children}</div>
      </body>
    </html>
  );
}
