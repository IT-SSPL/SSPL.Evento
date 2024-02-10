import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import PageWrapper from "../components/PageWrapper";

async function InfoPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <PageWrapper title="Informacje" isReturn>
      <p>Informacje | {data.user.email}</p>;
    </PageWrapper>
  );
}

export default InfoPage;
