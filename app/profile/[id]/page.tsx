import React from "react";
import { cookies } from "next/headers";

import PageWrapper from "@/app/components/PageWrapper";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileEdit } from "./ProfileEdit";
import { IUser } from "@/app/types/types";
import { redirect } from "next/navigation";
import { IoMdRefresh } from "react-icons/io";

export const notNull = (value: string | null) => {
  return value !== null ? value : "";
};

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { message: string };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { id } = params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: userProfile } = await supabase
    .from("user")
    .select("*")
    .eq("id", id);

  if (!userProfile) {
    return <div>Brak profilu</div>;
  }

  const userData = userProfile[0] as IUser;
  const isYourProfile = user?.id === userData.id;

  const updateProfileInfo = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const description = formData.get("description") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("user")
      .update({
        name,
        surname,
        email,
        phone,
        description,
      })
      .eq("id", userData.id);

    if (error) {
      return redirect(`/profile/${id}?message=Try again later`);
    }
    return redirect(`/profile/${id}`);
  };

  return (
    <PageWrapper title={`Profil użytkownika`} isReturn>
      <main className="animate-in flex-1 flex flex-col w-full">
        <div className="join pt-4 pb-6">
          <div className="avatar join-item">
            <div className="w-40 rounded-xl">
              <Image
                width={400}
                height={400}
                src={`${
                  process.env.NEXT_PUBLIC_SUPABASE_URL as string
                }/storage/v1/object/public/profile-icons/${
                  userData.image_path
                }`}
                alt="Shoes"
                className="w-full"
              />
            </div>
          </div>
          <div className="join-item flex items-center p-4">
            <h1 className="font-bold text-2xl">
              {notNull(userData.name)} {notNull(userData.surname)}
            </h1>
          </div>
        </div>
        {isYourProfile ? (
          <form action={updateProfileInfo}>
            <ProfileEdit user={userData} />
          </form>
        ) : (
          <ProfileInfo user={userData} />
        )}
        {searchParams?.message && (
          <p className="alert bottom-4 w-full max-w-sm">
            <IoMdRefresh className="text-3xl" />
            {searchParams.message}
          </p>
        )}
      </main>
    </PageWrapper>
  );
};

export default ProfilePage;
