import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const { supabase, response } = createClient(request);

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const { data, error } = await supabase.auth.getUser();

  if ((error || !data?.user) && path !== "/login" && path !== "/login/code") {
    const url = new URL(request.nextUrl.href);
    // console.log(url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
  // try {
  //   // This `try/catch` block is only here for the interactive tutorial.
  //   // Feel free to remove once you have Supabase connected.
  //   const path = request.nextUrl.pathname;
  //   const { supabase, response } = createClient(request);

  //   // Refresh session if expired - required for Server Components
  //   // https://supabase.com/docs/guides/auth/server-side/nextjs
  //   const { data, error } = await supabase.auth.getUser();

  //   if (error || !data?.user) {
  //     const url = new URL(request.nextUrl.href);
  //     console.log(url)
  //     return NextResponse.redirect("/login");
  //   }

  //   return response;
  // } catch (e) {
  //   // If you are here, a Supabase client could not be created!
  //   // This is likely because you have not set up environment variables.
  //   // Check out http://localhost:3000 for Next Steps.
  //   return NextResponse.next({
  //     request: {
  //       headers: request.headers,
  //     },
  //   });
  // }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api (API routes)
     * - /login (login page)
     * - /icons (PWA icons)
     * - manifest.webmanifest (PWA manifest)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|login|icons|manifest.webmanifest).*)",
  ],
};
