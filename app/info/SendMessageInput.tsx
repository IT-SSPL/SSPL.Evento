"use client";

import { useState } from "react";
import { set, z } from "zod";
import { createClient } from "@/utils/supabase/client";

export const SendMessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<boolean>(false);

  async function handleSendMessage(formData: FormData) {
    const supabase = createClient();

    const message = formData.get("message") as string;

    const messageSchema = z.string().min(1);

    try {
      messageSchema.parse(message);
    } catch (error) {
      return setError(true);
    }

    setInputValue("");
    await supabase.from("messages").insert([{ message: message }]);
  }

  return (
    <form
      action={handleSendMessage}
      className="w-full fixed bottom-0 left-0 flex justify-center px-4 pt-2 pb-3 bg-background"
    >
      <div className="join w-full">
        <input
          className={`input input-bordered join-item rounded-l-2xl w-full ${
            error ? "input-error" : "input-primary"
          }`}
          placeholder="napisz coś ..."
          name="message"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(false);
          }}
        />
        <button
          className="btn join-item rounded-r-2xl btn-primary"
          type="submit"
        >
          Wyślij
        </button>
      </div>
    </form>
  );
};
