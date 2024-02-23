"use client";

import { useEffect, useRef, useState } from "react";
import { MessageType } from "./info.types";
import { createClient } from "@/utils/supabase/client";

const MessageBubble = ({ message, created_at }: MessageType) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Logo" src="/icons/maskable_icon.png" />
        </div>
      </div>
      <div className="chat-header">
        Kadra
        <time className="text-xs opacity-50">
          {" "}
          {new Date(created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
      <div className="chat-bubble chat-bubble-info">{message}</div>
    </div>
  );
};

export const RealtimeInfoMessages = ({
  serverInfoMessages,
}: {
  serverInfoMessages: MessageType[];
}) => {
  const supabase = createClient();
  const [messages, setMessages] = useState<MessageType[]>(serverInfoMessages);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-info-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages([...messages, payload.new as MessageType]);
        }
      )
      .subscribe();

    scrollToBottom();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, messages, setMessages]);

  const scrollToBottom = () => {
    if (!messagesContainerRef.current) return;
    (messagesContainerRef.current as HTMLElement).scrollIntoView({
      block: "end",
    });
  };

  return (
    <div
      id="messageContainer"
      ref={messagesContainerRef}
      className="pb-[4.5rem]"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} {...message} />
      ))}
    </div>
  );
};
