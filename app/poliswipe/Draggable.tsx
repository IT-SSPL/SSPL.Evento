"use client";

import React from "react";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

import { IUserForSwipe } from "./SwipeSection";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { LuKeySquare } from "react-icons/lu";

export function Draggable({ id, user }: { id: string; user: IUserForSwipe }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="avatar w-64 rounded-xl flex flex-col">
        <div className="w-64 rounded-xl">
          <Image
            width={300}
            height={300}
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_URL as string
            }/storage/v1/object/public/profile-icons/${user.image_path}`}
            alt="User profile picture"
            className="w-full pointer-events-none"
          />
        </div>
        <h1 className="font-bold text-xl mt-6">
          {user.name} {user.surname}
        </h1>
        <p className="my-4 text-left">{user.description}</p>
      </div>
    </button>
  );
}
