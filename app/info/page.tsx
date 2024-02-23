import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { RealtimeInfoMessages } from "./RealtimeInfoMessages";
import CustomIcon from "@/components/CustomIcon";
import ContentWithNav from "@/components/ContentWithNav";
import { SendMessageInput } from "./SendMessageInput";

const Notifications = dynamic(() => import("@/app/info/Notifications"), {
  ssr: false, // Make sure to render component client side to access window and Notification APIs
});

async function InfoPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: messages } = await supabase.from("messages").select("*");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userRole } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id!)
    .single();

  const canSendMessages =
    userRole && (userRole.role === "kadra" || userRole.role === "IT");

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="infoModuleIcon" className="mr-2" />
          Informacje
        </>
      }
      hasSidebar
    >
      <Notifications />
      <main className="animate-in flex-1 w-full max-h-full">
        {messages && <RealtimeInfoMessages serverInfoMessages={messages} />}
      </main>
      {canSendMessages && <SendMessageInput />}
    </ContentWithNav>
  );
}

export default InfoPage;
