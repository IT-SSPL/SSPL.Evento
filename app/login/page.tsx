import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const emailSchema = z.string().email();

    try {
      emailSchema.parse(email);
    } catch (error) {
      return redirect("/login?message=Invalid email address");
    }

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

    cookieStore.set("emailForSignIn", email);

    return redirect(`/login/code`);
  };

  return (
    <>
      <form className="w-full max-w-xs" action={signIn}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input input-bordered input-primary w-full"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <div className="divider"></div>

        <div className="form-control gap-4">
          <button className="btn btn-primary" type="submit">
            Zaloguj się
          </button>
        </div>
      </form>
      {searchParams?.message && (
        <p className="alert absolute bottom-4 w-full max-w-sm">
          <IoIosCloseCircleOutline className="text-3xl" />
          {searchParams.message}
        </p>
      )}
    </>
  );
}
