import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CodeInputContainer } from "@/app/components/CodeInputContainer";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; email: string };
}) {
  const validateCode = async (formData: FormData) => {
    "use server";

    const num1 = formData.get("num1") as string;
    const num2 = formData.get("num2") as string;
    const num3 = formData.get("num3") as string;
    const num4 = formData.get("num4") as string;
    const num5 = formData.get("num5") as string;
    const num6 = formData.get("num6") as string;

    const token = `${num1}${num2}${num3}${num4}${num5}${num6}`;

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

        <div className="">
          <CodeInputContainer />
        </div>
        <div className="divider"></div>

        <div className="form-control gap-4">
          <button className="btn btn-info">Enter</button>
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
