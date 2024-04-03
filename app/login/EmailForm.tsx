"use client";

import { useState } from "react";

export const EmailForm = ({
  signIn,
}: {
  signIn: (formData: FormData) => Promise<undefined>;
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (submitted) {
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }

  return (
    <form
      className="w-full max-w-xs"
      action={signIn}
      onSubmit={() => setSubmitted(true)}
    >
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        className="input input-bordered input-primary w-full"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />

      <div className="divider"></div>

      <div className="form-control gap-4">
        <button className="btn btn-primary" type="submit" disabled={submitted}>
          Zaloguj się
        </button>
        <a href="/login/code" className="text-sm text-center">
          Masz już kod?
        </a>
      </div>
    </form>
  );
};
