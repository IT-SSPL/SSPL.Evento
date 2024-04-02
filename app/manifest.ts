import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${process.env.NEXT_PUBLIC_APP_NAME || "Evento"}`,
    short_name: `${process.env.NEXT_PUBLIC_APP_NAME || "Evento"}`,
    description:
      "Evento PŁ to aplikacja PWA stworzona specjalnie dla uczestników wyjazdów organizowanych przez Samorządu Studenckiego Politechniki Łódzkiej, takich jak Adapciak czy Zimowiska. Znajdziesz w niej kompleksowe informacje dotyczące kadry, harmonogramu wycieczki oraz kanał komunikacyjny, zapewniający sprawną wymianę informacji.",
    lang: "pl",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#F9FAFB",
    background_color: "#F9FAFB",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  };
}
