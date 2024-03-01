"use client";

import Link from "next/link";
import Image from "next/image";
import { DndContext } from "@dnd-kit/core";
import { use, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { User } from "@supabase/supabase-js";
import { PiGhostLight } from "react-icons/pi";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { createClient } from "@/utils/supabase/client";

import Confetti from "react-confetti";

export interface IUserForSwipe {
  id: string;
  name: string | null;
  image_path: string;
}

export const SwipeSection = ({ user }: { user: User }) => {
  const containers = ["A", "B"];

  const [usersForSwipe, setUsersForSwipe] = useState<IUserForSwipe[]>();
  const [swipedMeRight, setSwipedMeRight] = useState<(string | null)[]>([]); // users who swiped me right
  const [reload, setReload] = useState<boolean>(false); // reload for fetching new users
  const [match, setMatch] = useState<boolean>(false); // match confetti

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      // Fetch users who swiped me right
      const { data: me } = await supabase
        .from("swipes")
        .select("*")
        .eq("swiped-right", user.id);

      const swipedMeRightTemp = me?.map((swipe) => swipe.owner) || [];

      swipedMeRightTemp && setSwipedMeRight(swipedMeRightTemp);

      // Fetch users for swipe
      const { data: swipes } = await supabase
        .from("swipes")
        .select('"swiped-left", "swiped-right"')
        .eq("owner", user.id);

      const swiped = [
        user.id,
        ...swipes
          ?.map((swipe) => swipe["swiped-left"])
          .concat(swipes?.map((swipe) => swipe["swiped-right"]))
          .filter(Boolean)!,
      ];

      const { data: users } = await supabase
        .from("users")
        .select("id, name, image_path")
        .not("name", "is", null)
        .not("surname", "is", null)
        .not("facebook_nickname", "is", null)
        .not("image_path", "eq", "default.jpg")
        .not("id", "in", `(${swiped!})`)
        .range(0, 4);

      users && setUsersForSwipe(users);
    }

    fetchData();

    return () => {
      setReload(false);
    };
  }, [reload]);

  const handleSwipe = async (
    currentUser: IUserForSwipe,
    direction: "left" | "right"
  ) => {
    swipedMeRight.includes(currentUser.id) && setMatch(true);

    if (direction === "left") {
      const { data, error } = await supabase
        .from("swipes")
        .insert([{ owner: user.id, "swiped-left": currentUser.id }]);

      console.log(currentUser.name, "swipe left - dislike");
    } else if (direction === "right") {
      const { data, error } = await supabase
        .from("swipes")
        .insert([{ owner: user.id, "swiped-right": currentUser.id }]);

      console.log(currentUser.name, "swipe right - like");
    }

    setUsersForSwipe(usersForSwipe?.slice(1));

    if (usersForSwipe && usersForSwipe?.length <= 2) {
      setReload(true);
    }
  };

  return (
    <>
      {match && (
        <Confetti
          width={screen.width}
          height={screen.height}
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={() => setMatch(false)}
        />
      )}

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-1 relative">
          {/* Disliked drop container */}
          <div className="absolute left-0 h-full flex translate-x-[-120%]">
            <Droppable key={containers[0]} id={containers[0]}>
              {"Disliked"}
            </Droppable>
          </div>

          {/* Swipe section */}
          <div className="w-full grid place-content-center">
            <div className="stack">
              {usersForSwipe ? (
                usersForSwipe.length !== 0 ? (
                  usersForSwipe.map((user, i) =>
                    i === 0 ? (
                      <Draggable id="draggable" user={user} key={user.id} />
                    ) : (
                      <div className="avatar" key={user.id}>
                        <div className="w-64 rounded-xl">
                          <Image
                            width={300}
                            height={300}
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
                  )
                ) : (
                  <div className="flex flex-col items-center animate-pulse">
                    <PiGhostLight className="text-xl animate-ghost" />
                    Pusto tutaj...
                  </div>
                )
              ) : (
                <span className="loading loading-dots loading-lg"></span>
              )}
            </div>
          </div>

          {/* Liked drop container */}
          <div className="absolute right-0 h-full flex translate-x-[120%]">
            <Droppable key={containers[1]} id={containers[1]}>
              {"Liked"}
            </Droppable>
          </div>
        </div>
      </DndContext>

      <section>
        <div className="flex justify-center w-full mb-8">
          <div className="flex w-3/4">
            <button
              className="btn grid place-items-center flex-1"
              onClick={() => {
                if (!usersForSwipe || usersForSwipe.length === 0) return;

                const currentUser = usersForSwipe[0];
                handleSwipe(currentUser, "left");
              }}
            >
              <IoIosClose className="text-5xl text-pink-600" />
            </button>

            <div className="divider divider-horizontal" />

            <button className="btn grid place-items-center flex-1">
              <IoIosHeart
                className="text-3xl text-emerald-400"
                onClick={() => {
                  if (!usersForSwipe || usersForSwipe.length === 0) return;

                  const currentUser = usersForSwipe[0];
                  handleSwipe(currentUser, "right");
                }}
              />
            </button>
          </div>
        </div>

        <Link
          className="btn w-1/2 btn-sm absolute right-2 top-0"
          href="/poliswipe/matches"
        >
          Matches
        </Link>
      </section>
    </>
  );

  function handleDragEnd(event: any) {
    const { over } = event;

    if (!over) return;
    if (!usersForSwipe) return;

    const currentUser = usersForSwipe[0];

    if (over.id === "A") {
      handleSwipe(currentUser, "left");
    } else if (over.id === "B") {
      handleSwipe(currentUser, "right");
    }
  }
};
