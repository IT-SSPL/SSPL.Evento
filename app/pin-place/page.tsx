import { cookies } from "next/headers";
import Link from "next/link";
import { IoIosPin } from "react-icons/io";

import { createClient } from "@/utils/supabase/server";
import ContentWithNav from "@/components/ContentWithNav";
import CustomIcon from "@/components/CustomIcon";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

async function PinPlacePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: pinEntries } = await supabase.from("pins").select("*");

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="mapModuleIcon" className="mr-2" />
          Miejsca
        </>
      }
      hasSidebar
    >
      <main className="animate-in w-full flex flex-col gap-4">
        <ul className="menu rounded-box text-center">
          {pinEntries &&
            pinEntries?.map((e, i) => (
              <li key={i} className="border-b">
                <Link
                  href={e.path}
                  className=" link-primary text-lg py-4 w-full flex justify-center"
                >
                  <IoIosPin />
                  {capitalizeFirstLetter(e.name)}
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </ContentWithNav>
  );
}

export default PinPlacePage;
