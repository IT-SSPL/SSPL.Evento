import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { ProfileCard } from "@/app/components/ProfileCard";
import PageWrapper from "../components/PageWrapper";
import CustomIcon from "../components/CustomIcon";

async function CrewPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  let { data: user } = await supabase
    .from("user")
    .select("*")
    .like("role", "kadra");

  return (
    <PageWrapper
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          Kadra
        </>
      }
      hasSidebar
    >
      <main className="animate-in flex-1 w-full grid grid-cols-2 gap-5">
        {user && user?.map((user) => <ProfileCard user={user} key={user.id} />)}
      </main>
    </PageWrapper>
  );
}

export default CrewPage;
