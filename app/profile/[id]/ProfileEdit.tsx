"use client";

import { IUser } from "@/app/types/types";
import { useState } from "react";

const InputRow = ({
  label,
  value,
  name,
}: {
  label: string;
  value: string;
  name: string;
}) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="join-item flex items-baseline">
      <p className="font-bold text-lg">{label}:</p>
      <input
        className="ml-2 input input-ghost w-full max-w-xs p-2 h-8"
        name={name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export const ProfileEdit = ({ user }: { user: IUser }) => {
  return (
    <>
      <InputRow label="Imię" value={user.name} name="name" />
      <div className="divider m-0.5" />

      <InputRow label="Nazwisko" value={user.surname} name="surname" />
      <div className="divider m-0.5" />

      <InputRow label="Email" value={user.email} name="email" />
      <div className="divider m-0.5" />

      <InputRow label="Telefon" value={user.phone} name="phone" />
      <div className="divider m-0.5" />

      <div className="join-item flex items-baseline">
        <p className="font-bold text-lg">Opis:</p>
        <textarea
          className="ml-2 textarea textarea-ghost w-full max-w-xs"
          rows={4}
          name="description"
        >
          {user.description}
        </textarea>
      </div>

      <div className="form-control my-8">
        <button className="btn btn-info">Zapisz</button>
      </div>
    </>
  );
};
