"use client";

import { useState } from "react";
import { IUser } from "@/types/types";

const InputRow = ({
  label,
  value,
  name,
  placeholderText = "...",
  pattern,
}: {
  label: string;
  value: string;
  name: string;
  placeholderText?: string;
  pattern?: string;
}) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="join-item flex items-baseline self-end">
      <p className="font-bold text-lg">{label}:</p>
      <input
        className="ml-2 input input-ghost w-full p-2 h-8"
        placeholder={placeholderText}
        pattern={pattern}
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

      <div className="join-item flex items-baseline">
        <p className="font-bold text-lg">Email:</p>
        <p className="ml-2">{user.email}</p>
      </div>
      <div className="divider m-0.5" />

      <InputRow
        label="Telefon"
        value={user.phone}
        name="phone"
        placeholderText="000000000"
        pattern="[0-9]{9}"
      />
      <div className="divider m-0.5" />

      <InputRow
        label="Pokój"
        value={user.room}
        name="room"
        placeholderText=".../..."
      />
      <div className="divider m-0.5" />

      <div className="join-item flex items-baseline justify-between">
        <p className="font-bold text-lg">Zdjęcie:</p>
        <input
          type="file"
          className="ml-2 file-input file-input-ghost w-full p-2 h-8"
          name="image"
        />
      </div>
      <div className="divider m-0.5" />

      <div className="join-item flex items-baseline justify-between">
        <p className="font-bold text-lg">Opis:</p>
        <textarea
          className="ml-2 textarea textarea-ghost w-full"
          rows={4}
          name="description"
          defaultValue={user.description}
        ></textarea>
      </div>

      <div className="form-control my-8">
        <button className="btn btn-info">Zapisz</button>
      </div>
    </>
  );
};
