import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Header from "../components/Header";

async function TrailsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <>
      <Header title="Trasy" isReturn />
      <p>Trasy | {data.user.email}</p>;
    </>
  );
}

export default TrailsPage;
