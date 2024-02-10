"use client";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PageWrapper from "../components/PageWrapper";
import { InfoMessage } from "./InfoMessage";
import { MessageType } from "./info.types";
import { useEffect, useRef, useState } from "react";
import CustomIcon from "../components/CustomIcon";

function InfoPage() {
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const [isCrew, setIsCrew] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const messagesContainerRef = useRef(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        redirect("/");
      }

      let { data: userRole } = await supabase
        .from("user")
        .select("role")
        .eq("id", data.user.id);

      userRole && userRole[0].role === "kadra"
        ? setIsCrew(true)
        : setIsCrew(false);

      let { data: messages } = await supabase.from("messages").select("*");
      setAllMessages(messages as MessageType[]);

      supabase
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            setAllMessages((prev) => [...prev, payload.new as MessageType]);
          }
        )
        .subscribe();
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (allMessages) {
      scrollToBottom();
    }
  }, [allMessages]);

  const scrollToBottom = () => {
    if (!messagesContainerRef.current) return;
    (messagesContainerRef.current as HTMLElement).scrollIntoView({
      block: "end",
    });
  };

  async function handleSendMessage(formData: FormData) {
    const message = formData.get("message");

    await supabase.from("messages").insert([{ message: message }]);
    setInputValue("");
  }

  return (
    <PageWrapper
      title={
        <>
          <CustomIcon name="infoModuleIcon" className="mr-2" />
          Informacje
        </>
      }
      isReturn
    >
      <main
        className="animate-in flex-1 w-full pb-28"
        id="messageContainer"
        ref={messagesContainerRef}
      >
        {allMessages &&
          allMessages?.map((message: MessageType) => (
            <InfoMessage
              key={message.id}
              id={message.id}
              message={message.message}
              created_at={message.created_at}
            />
          ))}
      </main>
      {isCrew && (
        <form
          action={handleSendMessage}
          className="w-full fixed bottom-0 left-0 flex justify-center px-6 pb-5 pt-3 border-t border-t-foreground/10 bg-background"
        >
          <div className="join w-full">
            <input
              className="input input-bordered join-item rounded-l-full w-full"
              placeholder="napisz coś ..."
              name="message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
    </PageWrapper>
  );
}

export default InfoPage;
