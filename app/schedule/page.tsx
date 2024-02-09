import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Header from "../components/Header";

async function SchedulePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <>
      <Header title="Harmonogram" isReturn />
      <p>Harmonogram | {data.user.email}</p>;
    </>
  );
}

export default SchedulePage;
