import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { CodeInputContainer } from "@/app/login/code/CodeInputContainer";

export default function LoginCodePage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const validateCode = async (formData: FormData) => {
    "use server";

    const token =
      (formData.get("num1") as string) +
      formData.get("num2") +
      formData.get("num3") +
      formData.get("num4") +
      formData.get("num5") +
      formData.get("num6");

    const tokenSchema = z.string().length(6);

    try {
      tokenSchema.parse(token);
    } catch (error) {
      return redirect(`/login/code?message=Invalid code`);
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const email = cookieStore.get("emailForSignIn")?.value as string;

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: "email",
    });

    if (error) {
      return redirect(`/login/code?message=Incorrect value`);
    }

    cookieStore.delete("emailForSignIn");

    if (session) {
      const { error } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      if (error) {
        return redirect(`/login?message=Session error`);
      }
    }

    return redirect("/");
  };

  return (
    <>
      <form className="w-full max-w-xs" action={validateCode}>
        <label className="label">Code</label>

        <div>
          <CodeInputContainer />
        </div>
        <div className="divider"></div>

        <div className="form-control gap-4">
          <button className="btn btn-primary" type="submit">
            Wprowadz kod
          </button>
        </div>
      </form>
      {searchParams?.message && (
        <p className="alert absolute bottom-20 w-full max-w-sm">
          <IoIosCloseCircleOutline className="text-3xl" />
          {searchParams.message}
        </p>
      )}
    </>
  );
}
