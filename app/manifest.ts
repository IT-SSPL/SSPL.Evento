import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZimowiskApp",
    short_name: "ZimowiskApp",
    description: "Aplikacja dla uczestników Zimowiska SSPŁ 2024",
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
