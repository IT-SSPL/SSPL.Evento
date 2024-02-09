import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { ProfileCard } from "@/app/components/ProfileCard";
import Header from "../components/Header";

async function KadraPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  let { data: user } = await supabase
    .from("user")
    .select("*")
    .like("role", "kadra");

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center">
      <Header title="Kadra" isReturn />
      <main className="animate-in flex-1 w-full grid grid-cols-2 gap-5 mt-6 mb-10">
        {user && user?.map((user) => <ProfileCard user={user} key={user.id} />)}
      </main>
    </div>
  );
}

export default KadraPage;
