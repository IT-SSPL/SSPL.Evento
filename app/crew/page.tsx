import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { ProfileCard } from "@/app/crew/ProfileCard";
import ContentWithNav from "@/components/ContentWithNav";
import CustomIcon from "@/components/CustomIcon";

async function CrewPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .like("role", "kadra");

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          Kadra
        </>
      }
      hasSidebar
    >
      <main className="animate-in flex-1 w-full grid grid-cols-2 gap-5 mb-12">
        {users &&
          users?.map((user) => <ProfileCard user={user} key={user.id} />)}
      </main>
    </ContentWithNav>
  );
}

export default CrewPage;
