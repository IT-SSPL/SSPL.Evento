"use client";

import React, { useRef, useState } from "react";

export const CodeInputContainer = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpBoxReference = useRef([]);

  function handleChange(value: string, i: number) {
    const otpCopy = [...otp];
    otpCopy[i] = value.charAt(0);
    setOtp(otpCopy);

    if (value && i < 5) {
      (otpBoxReference.current[i + 1] as HTMLElement).focus();
    }
  }

  function handleBackspace(
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) {
    if (
      e.key === "Backspace" &&
      !(e.target as HTMLInputElement).value &&
      i > 0
    ) {
      (otpBoxReference.current[i - 1] as HTMLElement).focus();
    }
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      {otp.map((digit: string, i: number) => (
        <input
          key={i}
          name={`num${i + 1}`}
          className="input input-bordered input-primary px-0 text-center"
          type="number"
          placeholder="●"
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyUp={(e) => handleBackspace(e, i)}
          onKeyDown={(e) =>
            !(/[0-9]/.test(e.key) || e.key === "Backspace") &&
            e.preventDefault()
          }
          ref={(ref) =>
            ((otpBoxReference.current[i] as HTMLElement) = ref as HTMLElement)
          }
        />
      ))}
    </div>
  );
};
