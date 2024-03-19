import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { PiGhostLight } from "react-icons/pi";

import CustomIcon from "@/components/CustomIcon";
import ContentWithNav from "@/components/ContentWithNav";
import { createClient } from "@/utils/supabase/server";

async function MatchesPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch user data
  const { data } = await supabase.auth.getUser();

  // Fetch users who swiped me right
  const { data: swiped_right } = await supabase
    .from("swipes")
    .select("owner")
    .eq("swiped-right", data.user!.id);

  const userSwipedMeRight = swiped_right?.map((swipe) => swipe.owner);

  // Users who I swiped right and they swiped me right (matches)
  const { data: matches } = await supabase
    .from("swipes")
    .select("*")
    .eq("owner", data.user!.id)
    .in("swiped-right", userSwipedMeRight!);

  const matchesUsers = matches?.map((match) => match["swiped-right"]);

  // Fetch users data who I matched with
  const { data: users } = await supabase
    .from("users")
    .select("id, name, surname, facebook_nickname, image_path")
    .in("id", matchesUsers!);

  return (
    <ContentWithNav
      title={
        <>
          <CustomIcon name="matchesModuleIcon" className="mr-2" />
          Matches
        </>
      }
      hasArrow
    >
      <main className="animate-in w-full flex flex-col items-center">
        <ul className="menu w-full">
          {users && users.length !== 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <Link href={`https://m.me/${user.facebook_nickname}`}>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
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
                    <div>
                      <div className="font-bold">
                        {user.name} {user.surname}
                      </div>
                      <div className="text-sm opacity-50">
                        {user.facebook_nickname}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <div className="flex flex-col items-center animate-pulse">
              <PiGhostLight className="text-xl animate-ghost" />
              Pusto tutaj...
            </div>
          )}
        </ul>
      </main>
    </ContentWithNav>
  );
}

export default MatchesPage;
