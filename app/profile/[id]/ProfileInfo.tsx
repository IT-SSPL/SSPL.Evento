import { IUser } from "@/app/types/types";
import React from "react";

export const ProfileInfo = ({ user }: { user: IUser }) => {
  return (
    <>
      {user.email && (
        <>
          <a
            className="join-item flex items-baseline"
            href={`mailto:${user.email}`}
          >
            <p className="font-bold text-lg">Email:</p>
            <p className="ml-2">{user.email}</p>
          </a>
          <div className="divider m-0.5" />
        </>
      )}
      {user.phone && (
        <>
          <a
            className="join-item flex items-baseline"
            href={`tel:+48${user.phone}`}
          >
            <p className="font-bold text-lg">Telefon:</p>
            <a className="ml-2">{user.phone}</a>
          </a>
          <div className="divider m-0.5" />
        </>
      )}
      {user.room && (
        <>
          <div className="join-item flex items-baseline">
            <p className="font-bold text-lg">Pokój:</p>
            <p className="ml-2">{user.room}</p>
          </div>
          <div className="divider m-0.5" />
        </>
      )}
      {user.description && (
        <div className="join-item flex items-baseline">
          <p className="font-bold text-lg">Opis:</p>
          <p className="ml-2">{user.description}</p>
        </div>
      )}
    </>
  );
};
