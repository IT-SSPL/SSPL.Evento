import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZimowiskApp",
    short_name: "zimowiskapp",
    description: "Aplikacja dla uczestników zimowiska",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#FFFFFF",
    background_color: "#FFFFFF",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  };
}
