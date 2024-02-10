"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { IModule, IUser } from "../types/types";
import PagerWrapper from "./PageWrapper";

export default function PageWrapperClient({
  children,
  title,
  hasSidebar,
}: {
  children: React.ReactNode;
  title: string | React.ReactNode;
  hasSidebar?: boolean;
}) {
  const [module, setModule] = useState<IModule[]>();
  const [userData, setUserData] = useState<IUser>();

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

      let { data: user } = await supabase
        .from("user")
        .select("*")
        .eq("id", data.user.id);

      setModule(module as IModule[]);
      if (user) {
        setUserData(user[0]);
      }
    }

    checkAuthAndFetchData();
  }, []);

  const signOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <PagerWrapper
      title={title}
      hasSidebar={hasSidebar}
      module={module as IModule[]}
      userData={userData as IUser}
      signOut={signOut}
    >
      {children}
    </PagerWrapper>
  );
}
