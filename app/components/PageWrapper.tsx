import Image from "next/image";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { emptyIfNull } from "@/utils/emptyIfNull";
import { IModule, IUser } from "../types/types";

export default function PageWrapper({
  children,
  title,
  hasSidebar,
  userData,
  module,
  signOut,
}: {
  children: React.ReactNode;
  title: string | React.ReactNode;
  hasSidebar?: boolean;
  userData: IUser;
  module: IModule[];
  signOut: () => void;
}) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="container mx-auto flex min-h-screen flex-col items-center">
          {/* Navbar */}
          <div className="w-full fixed left-0 top-0 navbar bg-background border-b border-b-foreground/10 h-12 z-20">
            {hasSidebar && (
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost absolute left-4 text-3xl btn-sm "
                >
                  <IoIosMenu />
                </label>
              </div>
            )}
            <header className="font-bold text-xl flex-1 flex justify-center items-center">
              {title}
            </header>
          </div>
          <div className="px-4 sm:px-10 md:px-20 lg:px-24 w-full flex flex-1 mt-24 mb-12">
            {/* Page content here */}
            {children}
          </div>
        </div>
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 flex-1">
          {/* Sidebar content here */}
          <li className="border-b">
            <Link href="/" className="btn-ghost text-lg py-4">
              Strona główna
            </Link>
          </li>
          {module &&
            module?.map((e, i) => (
              <li key={i} className="border-b">
                <Link href={e.path} className="btn-ghost text-lg py-4">
                  {capitalizeFirstLetter(e.name)}
                </Link>
              </li>
            ))}
          {userData && (
            <li className="fixed bottom-6 left-0 w-full">
              <Link
                href={`profile/${userData.id}`}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="avatar">
                    <div className="w-10 rounded-xl">
                      <Image
                        width={400}
                        height={400}
                        src={`${
                          process.env.NEXT_PUBLIC_SUPABASE_URL as string
                        }/storage/v1/object/public/profile-icons/${
                          userData.image_path
                        }`}
                        alt="User profile picture"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="ml-2 text-lg">
                    {emptyIfNull(userData.name)}
                  </div>
                </div>

                <form action={signOut}>
                  <button className="btn btn-info btn-sm">Logout</button>
                </form>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
