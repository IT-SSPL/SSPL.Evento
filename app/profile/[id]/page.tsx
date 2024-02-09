import Header from "@/app/components/Header";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { id } = params;

  let { data: user } = await supabase.from("user").select("*").eq("id", id);

  if (!user) {
    return <div>User not found</div>;
  }

  const notNull = (value: string | null) => {
    return value !== null ? value : "";
  };

  const userData = user[0];

  return (
    <div className="container mx-auto flex h-screen flex-col items-center">
      <Header title={`Profil użytkownika`} />

      <main className="animate-in flex-1 flex flex-col w-full">
        <div className="join py-4">
          <div className="avatar join-item">
            <div className="w-40 rounded-xl">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="join-item flex items-center p-4">
            <h1 className="font-bold text-2xl">
              {notNull(userData.name)} {notNull(userData.surname)}
            </h1>
          </div>
        </div>
        <div className="">
          {userData.email && (
            <div className="join-item flex items-center p-4">
              <p className="font-bold text-lg">Email:</p>
              <p className="ml-2">{userData.email}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
