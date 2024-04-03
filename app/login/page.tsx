import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { EmailForm } from "./EmailForm";

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
      <EmailForm signIn={signIn} />
      {searchParams?.message && (
        <p className="alert absolute bottom-20 w-full max-w-sm">
          <IoIosCloseCircleOutline className="text-3xl" />
          {searchParams.message}
        </p>
      )}
    </>
  );
}
