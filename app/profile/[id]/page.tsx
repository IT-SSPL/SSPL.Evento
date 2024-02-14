import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoMdRefresh } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

import PageWrapperServer from "@/components/PageWrapperServer";
import { createClient } from "@/utils/supabase/server";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileEdit } from "./ProfileEdit";
import { IUser } from "@/types/types";
import { emptyIfNull } from "@/utils/emptyIfNull";

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

  if (!user) {
    redirect("/");
  }

  let { data: userProfile } = await supabase
    .from("user")
    .select("*")
    .eq("id", id);

  if (!userProfile) {
    return (
      <div className="animate-in flex-1 grid w-full min-h-screen place-content-center">
        Brak profilu
      </div>
    );
  }

  const userData = userProfile[0] as IUser;
  const isYourProfile = user?.id === userData.id;

  const updateProfileInfo = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const phone = formData.get("phone") as string;
    const room = formData.get("room") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // TODO: Compress images before uploading
    // TODO: Fix - update only changed fields

    // update profile image
    const array_buffer = await image.arrayBuffer();
    const image_path = image
      ? `${user?.id}/profile-${uuidv4()}.webp`
      : userData.image_path;

    if (image) {
      try {
        const { data, error } = await supabase.storage
          .from("profile-icons")
          .upload(image_path, array_buffer, {
            cacheControl: "3600",
            contentType: "image/webp",
          });

        await supabase
          .from("user")
          .update({
            name,
            surname,
            phone,
            description,
            room,
            image_path: data?.path,
          })
          .eq("id", userData.id);

        return redirect(`/profile/${id}`);
      } catch (error) {
        return redirect(
          `/profile/${id}?message=Error while uploading image (max size: 10 MB)`
        );
      }
    } else {
      // update profile data to database
      const { error } = await supabase
        .from("user")
        .update({
          name,
          surname,
          phone,
          description,
          room,
        })
        .eq("id", userData.id);

      if (error) {
        return redirect(`/profile/${id}?message=Try again later`);
      }
      return redirect(`/profile/${id}`);
    }
  };

  return (
    <PageWrapperServer title={`Profil użytkownika`} hasSidebar>
      <main className="animate-in flex-1 flex flex-col w-full">
        <div className="join pb-6">
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
                alt="User profile picture"
                className="w-full"
              />
            </div>
          </div>
          <div className="join-item flex items-center p-4">
            <h1 className="font-bold text-2xl">
              {emptyIfNull(userData.name)} {emptyIfNull(userData.surname)}
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
          <p className="alert bottom-4 w-full max-w-sm self-center">
            <IoMdRefresh className="text-3xl" />
            {searchParams.message}
          </p>
        )}
      </main>
    </PageWrapperServer>
  );
};

export default ProfilePage;
