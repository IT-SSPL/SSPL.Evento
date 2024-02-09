import Link from "next/link";
import Image from "next/image";
import { capitalizeFirstLetter } from "../lib/capitalizeFirstLetter";

interface IUser {
  id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
  description: string;
  phone: string;
}

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
          src="/image/"
          alt="Shoes"
          className="w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.name} {user.surname}
          <div className="badge badge-info">
            {capitalizeFirstLetter(user.role)}
          </div>
        </h2>
        <p>cos</p>
        <div className="card-actions justify-end"></div>
      </div>
    </Link>
  );
};
