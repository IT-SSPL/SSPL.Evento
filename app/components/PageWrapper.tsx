"use client";

import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";
import { use, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export default function PageWrapper({
  children,
  title,
  hasSidebar,
}: {
  children: React.ReactNode;
  title: string;
  hasSidebar?: boolean;
}) {
  const [module, setModule] = useState<any[] | null>();
  useEffect(() => {
    async function checkAuthAndFetchData() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        redirect("/");
      }
      let { data: module } = await supabase
        .from("module")
        .select("*")
        .is("isVisible", true);

      setModule([{ name: "strona głowna", path: "/" }, ...(module as any[])]);
    }

    checkAuthAndFetchData();
  }, []);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="container mx-auto flex min-h-screen flex-col items-center">
          {/* Navbar */}
          <div className="w-full navbar bg-background border-b border-b-foreground/10 h-12">
            {hasSidebar && (
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost absolute left-4 text-3xl btn-sm "
                >
                  <IoIosMenu />
                </label>
              </div>
            )}
            <header className="font-bold text-xl flex-1 flex justify-center items-center">
              {title}
            </header>
          </div>
          <div className="px-4 sm:px-10 md:px-20 lg:px-24 w-full flex flex-1 mt-4 mb-12">
            {children}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {module &&
            module?.map((e, i) => (
              <li key={i} className="border-b">
                <Link href={e.path} className="btn-ghost text-lg py-4">
                  {capitalizeFirstLetter(e.name)}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
