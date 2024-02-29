"use client";

import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { Tables } from "@/types/supabase.types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export const TinderSwaps = () => {
  const containers = ["A", "B"];

  const [users, setUsers] = useState<Tables<"users">[]>();
  const supabase = createClient();

  useEffect(() => {
    async function fetchUsers() {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .range(0, 4);

      if (users === null) return;

      setUsers(users);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-1 relative">
          <div className="absolute left-0 h-full flex translate-x-[-100%]">
            <Droppable key={containers[0]} id={containers[0]}>
              {"Disliked"}
            </Droppable>
          </div>

          <div className="w-full grid place-content-center">
            <div className="stack">
              {users &&
                users.map((user, i) =>
                  i === 0 ? (
                    <Draggable id="draggable" user={user} />
                  ) : (
                    <div className="avatar" key={user.id}>
                      <div className="w-80 rounded-xl">
                        <Image
                          width={400}
                          height={400}
                          src={`${
                            process.env.NEXT_PUBLIC_SUPABASE_URL as string
                          }/storage/v1/object/public/profile-icons/${
                            user.image_path
                          }`}
                          alt="User profile picture"
                          className="w-full pointer-events-none"
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>

          <div className="absolute right-0 h-full flex translate-x-[100%]">
            <Droppable key={containers[1]} id={containers[1]}>
              {"Liked"}
            </Droppable>
          </div>
        </div>
      </DndContext>

      <div>Jakieś reakcje</div>
    </>
  );

  function handleDragEnd(event: any) {
    const { over } = event;
    const currentUser = users && users[0];

    if (over.id === "A") {
      console.log(currentUser?.name + " " + currentUser?.surname + " disliked");
    } else if (over.id === "B") {
      console.log(currentUser?.name + " " + currentUser?.surname + " liked");
    }

    setUsers(users?.slice(1));

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null
  }
};
