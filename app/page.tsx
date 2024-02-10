import AuthButton from "./components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
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

  const isSupabaseConnected = canInitSupabaseClient();

  let { data: module } = await supabase
    .from("module")
    .select("*")
    .is("isVisible", true);

  return (
    <PageWrapper title="TripApp">
      {/*//TODO: dangerous code, fix it!*/}
      <div className="animate-in flex-1 flex flex-col w-full h-[calc(100vh-(6rem+1px))] ">
        <main className="flex-1 flex flex-col gap-4 w-full justify-center">
          <h1 className="font-bold text-3xl">Cześć 👋</h1>
          <div className="max-h-[60vh] overflow-y-scroll">
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
          </div>
        </main>
        <AuthButton /> {/* //TODO: dorobić przycisk do wylogowania */}
      </div>
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
    </PageWrapper>
  );
}
