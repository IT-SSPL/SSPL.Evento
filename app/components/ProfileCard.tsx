import Link from "next/link";
import Image from "next/image";
import { LuKeySquare } from "react-icons/lu";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { IUser } from "../types/types";

export const ProfileCard = ({ user }: { user: IUser }) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="card card-compact bg-base-100 shadow-xl max-h-72 w-full"
    >
      <figure>
        <Image
          width={400}
          height={400}
          src={`${
            process.env.NEXT_PUBLIC_SUPABASE_URL as string
          }/storage/v1/object/public/profile-icons/${user.image_path}`}
          alt="Profile picture"
          className="w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.name} {user.surname}
        </h2>
        <div className="card-actions">
          <div className="badge badge-info flex items-center">
            <LuKeySquare className="mr-2" />
            {user.room !== null ? capitalizeFirstLetter(user.room) : ""}
          </div>
        </div>
      </div>
    </Link>
  );
};
