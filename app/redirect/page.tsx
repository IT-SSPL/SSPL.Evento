"use client";

import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();

  return router.push(process.env.NEXT_PUBLIC_REDIRECT_URL || "/");
}
