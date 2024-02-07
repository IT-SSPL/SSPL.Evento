import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full flex justify-center items-center border-b border-b-foreground/10 h-12">
        <h1 className="font-bold text-xl">TripApp</h1>
      </div>

      <main className="animate-in flex-1 flex flex-col items-center justify-center relative">
        <form className="w-full max-w-xs" action={signIn}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input input-bordered input-info w-full"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input input-bordered input-info w-full"
            type="password"
            name="password"
            placeholder="•••••••"
            required
          />
          <div className="divider"></div>

          <div className="form-control gap-4">
            <button className="btn btn-info">Sign In</button>
            <button formAction={signUp} className="btn btn-outline btn-info">
              Sign Up
            </button>
          </div>
        </form>
        {searchParams?.message && (
          <p className="alert absolute bottom-4 w-full max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {searchParams.message}
          </p>
        )}
      </main>

      <footer className="w-full border-t border-t-foreground/10 pb-5 pt-3 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://samorzad.p.lodz.pl/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Komisja ds. IT SSPŁ
          </a>
        </p>
      </footer>
    </div>
  );
}
