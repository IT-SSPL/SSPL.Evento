import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import PageWrapper from "../components/PageWrapper";
import { Message } from "./Message";
import { MessageType } from "./info.types";

async function InfoPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  let { data: messages } = await supabase.from("messages").select("*");

  let { data: userRole } = await supabase
    .from("user")
    .select("role")
    .eq("id", data.user.id);

  async function handleSendMessage(formData: FormData) {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const message = formData.get("message");

    await supabase
      .from("messages")
      .insert([{ message: message }])
      .select();
  }

  return (
    <PageWrapper title="Informacje" isReturn>
      <main className="animate-in flex-1 w-full">
        <div>
          {messages &&
            messages?.map((message: MessageType) => (
              <Message
                key={message.id}
                id={message.id}
                message={message.message}
                created_at={message.created_at}
              />
            ))}
        </div>
        {userRole && userRole[0].role === "kadra" && (
          <form
            action={handleSendMessage}
            className="sticky bottom-12 w-full flex justify-center"
          >
            <div className="join">
              <input
                className="input input-bordered join-item rounded-l-full"
                placeholder="napisz coś ..."
                name="message"
              />
              <button
                className="btn join-item rounded-r-full btn-info"
                type="submit"
              >
                Wyślij
              </button>
            </div>
          </form>
        )}
      </main>
    </PageWrapper>
  );
}

export default InfoPage;
