import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function PoliSwipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();

  const { data: user } = await supabase
    .from("users")
    .select("id, name, surname, facebook_nickname, image_path")
    .eq("id", data.user!.id)
    .single();

  if (
    !(
      user!.id &&
      user!.name &&
      user!.surname &&
      user!.facebook_nickname &&
      user!.image_path !== "default.jpg"
    )
  ) {
    return redirect(`/profile/${user!.id}?poliswipe=Wypełnij swój profil`);
  }

  return <>{children}</>;
}
