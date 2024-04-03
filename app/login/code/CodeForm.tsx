"use client";

import { useState } from "react";
import { CodeInputContainer } from "./CodeInputContainer";

export const CodeForm = ({
  validateCode,
}: {
  validateCode: (formData: FormData) => Promise<undefined>;
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
      action={validateCode}
      onSubmit={() => setSubmitted(true)}
    >
      <label className="label">Kod</label>

      <div>
        <CodeInputContainer />
      </div>
      <div className="divider"></div>

      <div className="form-control gap-4">
        <button className="btn btn-primary" type="submit" disabled={submitted}>
          Wprowadz kod
        </button>
        <button
          className="btn btn-primary btn-outline btn-sm"
          disabled={submitted}
          onClick={async () => {
            const code = await navigator.clipboard.readText();

            if (code.length !== 6) {
              alert("Nieprawidłowy kod");
            }

            console.log(code);

            if (code.length === 6) {
              const inputs = document.querySelectorAll("[name^=num]");

              inputs.forEach((input, i) => {
                (input as HTMLInputElement).value = code[i];
              });
            }
          }}
        >
          Wklej kod
        </button>
      </div>
    </form>
  );
};
