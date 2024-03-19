"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { IModule } from "@/types/types";
import CustomIcon from "./CustomIcon";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { emptyIfNull } from "@/utils/emptyIfNull";

export const SideBarModuleList = ({ modules }: { modules: IModule[] }) => {
  const modulesList = [{ name: "Strona główna", path: "" }, ...modules];
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 flex-1">
      {/* Sidebar content here */}
      {modulesList?.map((e, i) => (
        <li key={i} className="border-b">
          <Link
            href={`/${e.path}`}
            className="btn-ghost text-lg py-4"
            onClick={() => {
              (
                document.getElementById("my-drawer-3")! as HTMLInputElement
              ).checked = false;
            }}
          >
            {<CustomIcon name={`${e.path}ModuleIcon`} />}
            {capitalizeFirstLetter(e.name)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const SideBarProfile = ({
  user,
}: {
  user: { id: string; name: string | null; image_path: string };
}) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex flex-1 items-center"
      onClick={() => {
        (document.getElementById("my-drawer-3")! as HTMLInputElement).checked =
          false;
      }}
    >
      <div className="avatar">
        <div className="w-10 rounded-xl">
          <Image
            width={100}
            height={100}
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_URL as string
            }/storage/v1/object/public/profile-icons/${user.image_path}`}
            alt="User profile picture"
            className="w-full"
          />
        </div>
      </div>
      <p className="ml-2 text-lg">{emptyIfNull(user.name)}</p>
    </Link>
  );
};
