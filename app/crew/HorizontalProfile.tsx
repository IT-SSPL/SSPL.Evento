import Link from "next/link";
import Image from "next/image";
import { LuKeySquare } from "react-icons/lu";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Tables } from "@/types/supabase.types";

export const HorizontalProfile = ({ user }: { user: Tables<"users"> }) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex items-center gap-4 bg-base-100 shadow-lg max-h-48 w-full rounded-xl"
    >
      <div className="avatar w-20 h-20">
        <Image
          width={200}
          height={200}
          src={`${
            process.env.NEXT_PUBLIC_SUPABASE_URL as string
          }/storage/v1/object/public/profile-icons/${user.image_path}`}
          alt="Profile picture"
          className="w-full rounded-l-xl"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-lg overflow-hidden">
          {user.name} {user.surname}
        </h2>
        <div className="badge badge-primary flex items-center">
          <LuKeySquare className="mr-2" />
          {capitalizeFirstLetter(user.room)}
        </div>
      </div>
    </Link>
  );
};
