import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Header from "../components/Header";

async function InfoPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <>
      <Header title="Informacje" isReturn />
      <p>Informacje | {data.user.email}</p>;
    </>
  );
}

export default InfoPage;
