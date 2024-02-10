import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

import { createClient } from "@/utils/supabase/server";
import PageWrapperServer from "../components/PageWrapperServer";
import CustomIcon from "../components/CustomIcon";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

async function SchedulePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  let { data: docEntries } = await supabase.from("docs").select("*");

  return (
    <PageWrapperServer
      title={
        <>
          <CustomIcon name="filesModuleIcon" className="mr-2" />
          Dokumenty
        </>
      }
      hasSidebar
    >
      <main className="animate-in w-full flex flex-col gap-4">
        <ul className="menu rounded-box text-center">
          {docEntries &&
            docEntries?.map((e, i) => (
              <li key={i} className="border-b">
                <Link
                  href={e.path}
                  className=" link-info text-lg py-4 w-full flex justify-center"
                >
                  <IoIosLink />
                  {capitalizeFirstLetter(e.name)}
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </PageWrapperServer>
  );
}

export default SchedulePage;
