import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
          <IoIosCloseCircleOutline className="text-3xl" />
          {searchParams.message}
        </p>
      )}
    </>
  );
}
