import Image from "next/image";
import { IoMdRefresh } from "react-icons/io";
import { cookies } from "next/headers";

import ContentWithNav from "@/components/ContentWithNav";
import { createClient } from "@/utils/supabase/server";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileEdit } from "./ProfileEdit";
import { emptyIfNull } from "@/utils/emptyIfNull";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { message: string };
}) => {
  const supabase = createClient(cookies());
  const { id } = params;

  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (!userProfile) {
    return (
      <div className="animate-in flex-1 grid w-full min-h-screen place-content-center">
        Brak profilu
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isYourProfile = user?.id === userProfile.id;

  return (
    <ContentWithNav title={`Profil użytkownika`} hasSidebar>
      <main className="animate-in flex-1 flex flex-col w-full">
        <div className="join pb-6">
          <div className="avatar join-item">
            <div className="w-40 rounded-xl">
              <Image
                width={200}
                height={200}
                src={`${
                  process.env.NEXT_PUBLIC_SUPABASE_URL as string
                }/storage/v1/object/public/profile-icons/${
                  userProfile.image_path
                }`}
                alt="User profile picture"
                className="w-full"
              />
            </div>
          </div>
          <div className="join-item flex items-center p-4">
            <h1 className="font-bold text-2xl">
              {emptyIfNull(userProfile.name)} {emptyIfNull(userProfile.surname)}
            </h1>
          </div>
        </div>
        {isYourProfile ? (
          <ProfileEdit user={userProfile} />
        ) : (
          <ProfileInfo user={userProfile} />
        )}
        {searchParams?.message && (
          <p className="alert bottom-4 w-full max-w-sm self-center">
            <IoMdRefresh className="text-3xl" />
            {searchParams.message}
          </p>
        )}
      </main>
    </ContentWithNav>
  );
};

export default ProfilePage;
