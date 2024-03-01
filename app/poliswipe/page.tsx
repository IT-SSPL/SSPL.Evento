import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CustomIcon from "@/components/CustomIcon";
import ContentWithNav from "@/components/ContentWithNav";
import { SwipeSection } from "./SwipeSection";
import { createClient } from "@/utils/supabase/server";

async function PoliSwipePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();

  const { data: user } = await supabase
    .from("users")
    .select("id, name, surname, facebook_nickname, image_path")
    .eq("id", data.user!.id)
    .single();

  if (!user) {
    return redirect("/login");
  }

  if (
    !(
      user.id &&
      user.name &&
      user.surname &&
      user.facebook_nickname &&
      user.image_path !== "default.jpg"
    )
  ) {
    return redirect(`/profile/${user.id}?poliswipe=Wypełnij swój profil`);
  }

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="crewModuleIcon" className="mr-2" />
          PoliSwipe
        </>
      }
      hasSidebar
    >
      <main className="animate-in w-full flex flex-col justify-center overflow-hidden">
        {data.user && <SwipeSection user={data.user} />}
      </main>
    </ContentWithNav>
  );
}

export default PoliSwipePage;
