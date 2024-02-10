import { MessageType } from "./info.types";

export const Message = ({ message, created_at }: MessageType) => {
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
