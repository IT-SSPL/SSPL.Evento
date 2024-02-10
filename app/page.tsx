import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import AuthButton from "./components/AuthButton";
import PageWrapper from "./components/PageWrapper";

export default async function IndexPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // const isSupabaseConnected = canInitSupabaseClient();

  let { data: module } = await supabase
    .from("module")
    .select("*")
    .is("isVisible", true);

  return (
    <PageWrapper title="TripApp">
      <div className="animate-in flex-1 flex flex-col w-full items-center justify-center">
        <main className="flex-1 flex flex-col gap-4 w-full justify-center">
          <h1 className="font-bold text-3xl">Cześć 👋</h1>
          <ul className="menu rounded-box">
            {module &&
              module?.map((e, i) => (
                <li key={i} className="border-b">
                  <Link href={e.path} className="btn-ghost text-lg py-4">
                    {capitalizeFirstLetter(e.name)}
                  </Link>
                </li>
              ))}
          </ul>
        </main>
        <AuthButton />{" "}
        {/* //TODO: przenieść przycisk do wylogowania do side menu */}
      </div>
      <footer className="w-full border-t border-t-foreground/10 pb-5 pt-3 flex justify-center text-center text-xs fixed bottom-0 bg-background left-0 max-h-12">
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
    </PageWrapper>
  );
}
