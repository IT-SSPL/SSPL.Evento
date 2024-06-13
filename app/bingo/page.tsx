import { cookies } from "next/headers";
import Link from "next/link";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { createClient } from "@/utils/supabase/server";
import ContentWithNav from "@/components/ContentWithNav";
import CustomIcon from "@/components/CustomIcon";

async function BingoPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: tasks } = await supabase.from("bingo_tasks").select("id, name");

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="bingoModuleIcon" className="mr-2" />
          Bingo
        </>
      }
      hasSidebar
    >
      <main className="animate-in flex-1 flex flex-col w-full items-center">
        <ul className="menu rounded-box w-full">
          {tasks &&
            tasks?.map((e, i) => (
              <li key={i} className="border-b">
                <Link href={`/bingo/${e.id}`} className="btn-ghost text-lg py-2 w-full">
                  <div>
                    <span className="font-bold">
                      Zadanie {i + 1}
                      {e.name && ": "}
                    </span>
                    {capitalizeFirstLetter(e.name)}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </ContentWithNav>
  );
}

export default BingoPage;
