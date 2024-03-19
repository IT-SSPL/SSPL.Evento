"use client";

import { useState } from "react";

import { updateProfileData } from "./updateProfileData";
import { Tables } from "@/types/supabase.types";

const InputRow = ({
  label,
  value,
  name,
  type = "text",
  tooptip,
  placeholderText = "...",
  pattern,
  isDisabled,
  hasDivider,
}: {
  label: string;
  value: string | null;
  name: string;
  type?: string;
  tooptip?: string;
  placeholderText?: string;
  pattern?: string;
  isDisabled?: boolean;
  hasDivider?: boolean;
}) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <>
      <div className="join-item flex self-end items-center">
        <p className="font-bold text-lg">{label}:</p>
        <div className="tooltip" data-tip={tooptip}>
          <input
            className="ml-2 input input-ghost w-full p-2 h-8"
            placeholder={placeholderText}
            pattern={pattern}
            name={name}
            value={inputValue || ""}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isDisabled}
            type={type}
          />
        </div>
      </div>
      {hasDivider && <div className="divider m-0.5" />}
    </>
  );
};

// TODO: rewrite to use client side

export const ProfileEdit = ({ user }: { user: Tables<"users"> }) => {
  return (
    <form
      action={async (e) => {
        await updateProfileData(e, user);
      }}
    >
      <InputRow
        label="Imię"
        value={user.name}
        name="name"
        tooptip="od 1 do 30 znaków"
        hasDivider
      />

      <InputRow
        label="Nazwisko"
        value={user.surname}
        name="surname"
        tooptip="od 1 do 30 znaków"
        hasDivider
      />

      <InputRow
        label="Email"
        value={user.email}
        name="email"
        isDisabled
        hasDivider
      />

      <InputRow
        label="Telefon"
        value={user.phone}
        name="phone"
        placeholderText="000000000"
        pattern="[0-9]{9}"
        type="tel"
        tooptip="format xxxxxxxxx"
        hasDivider
      />

      <InputRow
        label="Pokój"
        value={user.room}
        name="room"
        placeholderText=".../..."
        hasDivider
      />

      <InputRow
        label="Facebook"
        value={user.facebook_nickname}
        name="facebook"
        placeholderText="nickname"
        tooptip="nickname do profilu facebook"
        hasDivider
      />

      <div className="join-item flex items-center justify-between">
        <p className="font-bold text-lg">Zdjęcie:</p>
        <input
          type="file"
          className="ml-2 file-input file-input-ghost w-full p-2 h-8"
          name="image"
        />
      </div>
      <div className="divider m-0.5" />

      <div className="join-item flex justify-between">
        <p className="font-bold text-lg">Opis:</p>
        <div className="tooltip" data-tip="do 200 znaków">
          <textarea
            className="ml-2 textarea textarea-ghost w-full"
            rows={4}
            name="description"
            defaultValue={user.description || ""}
          ></textarea>
        </div>
      </div>

      <div className="form-control my-8">
        <button className="btn btn-primary">Zapisz</button>
      </div>
    </form>
  );
};
