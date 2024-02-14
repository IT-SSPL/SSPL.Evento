import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CodeInputContainer } from "@/components/CodeInputContainer";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function LoginCodePage({
  searchParams,
}: {
  searchParams: { message: string; email: string };
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

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: searchParams.email,
      token: token,
      type: "email",
    });

    if (error) {
      return redirect(`/login/code?message=Incorrect Code`);
    }

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
          <button className="btn btn-info">Enter</button>
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
