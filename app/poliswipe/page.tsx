import { cookies } from "next/headers";

import { SwipeSection } from "./SwipeSection";
import CustomIcon from "@/components/CustomIcon";
import { createClient } from "@/utils/supabase/server";
import ContentWithNav from "@/components/ContentWithNav";

async function PoliSwipePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();

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
