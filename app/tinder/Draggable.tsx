"use client";

import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { Tables } from "@/types/supabase.types";

export function Draggable({ id, user }: { id: string; user: Tables<"users"> }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px , ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="avatar">
        <div className="w-80 rounded-xl">
          <Image
            width={400}
            height={400}
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_URL as string
            }/storage/v1/object/public/profile-icons/${user.image_path}`}
            alt="User profile picture"
            className="w-full pointer-events-none"
          />
        </div>
      </div>
    </button>
  );
}
