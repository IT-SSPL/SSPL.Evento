import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        // shouldCreateUser: false,
      },
    });

    if (error) {
      return redirect("/login?message=Too many requests. Try again later.");
    }

    return redirect(`/login/code?email=${email}`);
  };

  return (
    <>
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

        <div className="divider"></div>

        <div className="form-control gap-4">
          <button className="btn btn-info">Sign In</button>
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
    </>
  );
}
