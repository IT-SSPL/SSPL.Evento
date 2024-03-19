import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { SideBarModuleList, SideBarProfile } from "./SideBar";

export default async function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  const { data: userAuth } = await supabase.auth.getUser();

  const { data: modules } = await supabase
    .from("modules")
    .select("path, name")
    .is("isVisible", true);

  const { data: user } = await supabase
    .from("users")
    .select("id, name, image_path")
    .eq("id", userAuth.user?.id!)
    .single();

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="container mx-auto flex min-h-screen flex-col items-center">
          {/* Content with Navbar */}
          {children}
        </div>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar */}
        {modules && <SideBarModuleList modules={modules} />}
        {user && (
          <div className="fixed bottom-6 left-0 w-80 px-4 flex justify-between items-center">
            <SideBarProfile user={user} />

            <form action={signOut}>
              <button className="btn btn-primary btn-sm" type="submit">
                Wyloguj
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
