"use client";
import React, { useRef, useState } from "react";

export const CodeInputContainer = () => {
  const numberOfDigits = 6;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const otpBoxReference = useRef([]);

  function handleChange(value: string, i: number) {
    const numericValue = value.replace(/[^0-9]/g, "");
    const otpCopy = [...otp];
    otpCopy[i] = numericValue;
    setOtp(otpCopy);

    if (value && i < numberOfDigits - 1) {
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
      {otp.map((digit, i) => (
        <input
          key={i}
          className="input input-bordered input-info px-0 text-center"
          type="text"
          placeholder="●"
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyUp={(e) => handleBackspace(e, i)}
          ref={(ref) =>
            ((otpBoxReference.current[i] as HTMLElement) = ref as HTMLElement)
          }
        />
      ))}
    </div>
  );
};
