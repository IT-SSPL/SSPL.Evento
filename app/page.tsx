import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Index() {
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

  const isSupabaseConnected = canInitSupabaseClient();

  let { data: module, error } = await supabase
    .from("module")
    .select("*")
    .is("isVisible", true);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center">
      <div className="w-full flex justify-center items-center border-b border-b-foreground/10 h-12">
        <h1 className="font-bold text-xl">TripApp</h1>
      </div>

      <div className="animate-in flex-1 flex flex-col w-full">
        <main className="flex-1 flex flex-col gap-4 w-full justify-center">
          <h1 className="font-bold text-3xl">Cześć 👋</h1>
          <div className="max-h-[60vh] overflow-y-scroll">
            <ul className="menu rounded-box">
              {module &&
                module?.map((e, i) => (
                  <>
                    <li>
                      <Link href={e.name} className="btn-ghost text-lg py-4">
                        {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                      </Link>
                    </li>
                    {i !== module!.length - 1 && <hr />}
                  </>
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
    </div>
  );
}
