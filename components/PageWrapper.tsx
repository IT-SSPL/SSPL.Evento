import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { emptyIfNull } from "@/utils/emptyIfNull";
import CustomIcon from "./CustomIcon";
import { createClient } from "@/utils/supabase/server";

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
        <ul className="menu p-4 w-80 min-h-full bg-base-200 flex-1">
          {/* Sidebar content here */}
          <li className="border-b">
            <Link href="/" className="btn-ghost text-lg py-4">
              <CustomIcon name="MainPageIcon" className="mr-2" />
              Strona główna
            </Link>
          </li>
          {modules &&
            modules?.map((e, i) => (
              <li key={i} className="border-b">
                <Link href={`/${e.path}`} className="btn-ghost text-lg py-4">
                  {<CustomIcon name={`${e.path}ModuleIcon`} />}
                  {capitalizeFirstLetter(e.name)}
                </Link>
              </li>
            ))}
        </ul>
        {user && (
          <div className="fixed bottom-6 left-0 w-80 px-4 flex justify-between items-center">
            <Link
              href={`/profile/${user.id}`}
              className="flex flex-1 items-center"
            >
              <div className="avatar">
                <div className="w-10 rounded-xl">
                  <Image
                    width={100}
                    height={100}
                    src={`${
                      process.env.NEXT_PUBLIC_SUPABASE_URL as string
                    }/storage/v1/object/public/profile-icons/${
                      user.image_path
                    }`}
                    alt="User profile picture"
                    className="w-full"
                  />
                </div>
              </div>
              <p className="ml-2 text-lg">{emptyIfNull(user.name)}</p>
            </Link>

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
