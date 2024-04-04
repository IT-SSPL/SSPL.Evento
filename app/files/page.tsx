import { cookies } from "next/headers";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

import { createClient } from "@/utils/supabase/server";
import ContentWithNav from "@/components/ContentWithNav";
import CustomIcon from "@/components/CustomIcon";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

async function SchedulePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: docEntries } = await supabase.from("docs").select("*");

  return (
    <ContentWithNav
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
                  target="_blank"
                  className=" link-primary text-lg py-4 w-full flex justify-center"
                >
                  <IoIosLink />
                  {capitalizeFirstLetter(e.name)}
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </ContentWithNav>
  );
}

export default SchedulePage;
