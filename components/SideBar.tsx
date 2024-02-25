"use client";

import React from "react";
import CustomIcon from "./CustomIcon";
import Link from "next/link";
import { Tables } from "@/types/supabase.types";
import { IModule } from "@/types/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export const SideBar = ({ modules }: { modules: IModule[] }) => {
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
