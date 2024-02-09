import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { ProfileCard } from "@/app/components/ProfileCard";

async function Kadra() {
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
      <div className="w-full flex justify-center items-center border-b border-b-foreground/10 h-12">
        <Link href="/">--</Link> {/* //TODO: stworzyc przycisk do cofania */}
        <h1 className="font-bold text-xl">Kadra</h1>
      </div>

      <main className="animate-in flex-1 w-full grid grid-cols-2 gap-5 mt-6 mb-10">
        {user && user?.map((user) => <ProfileCard user={user} key={user.id} />)}
      </main>
    </div>
  );
}

export default Kadra;
