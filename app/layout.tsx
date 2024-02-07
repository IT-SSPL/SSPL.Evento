import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { Viewport } from "next";

import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ZimowiskApp",
  description:
    "TripApp PŁ to aplikacja PWA stworzona specjalnie dla uczestników wyjazdów organizowanych przez Samorządu Studenckiego Politechniki Łódzkiej, takich jak Adapciak czy Zimowiska. Znajdziesz w niej kompleksowe informacje dotyczące kadry, harmonogramu wycieczki oraz kanał komunikacyjny, zapewniający sprawną wymianę informacji.",
  generator: "Next.js",
  manifest: "/manifest.json",
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
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#fff" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <html lang="pl" className={GeistSans.className}>
      <body className="bg-background text-foreground h-screen overflow-hidden">
        <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-24">{children}</div>
      </body>
    </html>
  );
}
