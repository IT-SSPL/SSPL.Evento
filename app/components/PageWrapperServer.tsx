import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { IModule, IUser } from "../types/types";
import PageWrapper from "./PageWrapper";

export default async function PageWrapperServer({
  children,
  title,
  hasSidebar,
}: {
  children: React.ReactNode;
  title: string | React.ReactNode;
  hasSidebar?: boolean;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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

  const userData = user && user[0];

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <PageWrapper
      title={title}
      hasSidebar={hasSidebar}
      module={module as IModule[]}
      userData={userData as IUser}
      signOut={signOut}
    >
      {children}
    </PageWrapper>
  );
}
