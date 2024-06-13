import { cookies } from "next/headers";

import ContentWithNav from "@/components/ContentWithNav";
import { HorizontalProfile } from "./HorizontalProfile";
import { createClient } from "@/utils/supabase/server";
import { ProfileCard } from "@/app/crew/ProfileCard";
import CustomIcon from "@/components/CustomIcon";

async function CrewPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .or("role.like.kadra,role.like.IT");

  const crew = users && users.filter((user) => user.role === "kadra");
  const it = users && users.filter((user) => user.role === "IT");

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          Organizatorzy
        </>
      }
      hasSidebar
    >
      <main className="animate-in flex-1 w-full mb-12">
        <div className="grid grid-cols-2 gap-5 mb-16">
          {crew &&
            crew?.map((user) => <ProfileCard user={user} key={user.id} />)}
        </div>
        <div className="divider col-span-2 font-bold">Wsparcie IT</div>
        <div className="flex flex-col gap-5">
          {it &&
            it?.map((user) => <HorizontalProfile user={user} key={user.id} />)}
        </div>
      </main>
    </ContentWithNav>
  );
}

export default CrewPage;
