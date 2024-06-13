"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Image from "next/image";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { IUserForSwipe } from "./SwipeSection";

export function Draggable({ id, user }: { id: string; user: IUserForSwipe }) {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
    id: id,
  });

  console.log(active);

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="flex flex-col w-64 items-center">
        <div className="avatar w-60 rounded-xl flex flex-col">
          <div className="w-60 rounded-xl">
            <Image width={300} height={300} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL as string}/storage/v1/object/public/profile-icons/${user.image_path}`} alt="User profile picture" className="w-full pointer-events-none" />
          </div>
        </div>
        {active === null && (
          <>
            <h1 className="font-bold text-xl mt-4">
              {user.name} {user.surname}
            </h1>
            <p className="my-2 tex-center h-16 overflow-y-scroll hidden-scroll">{user.description}</p>
          </>
        )}
      </div>
    </button>
  );
}
