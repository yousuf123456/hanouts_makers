"use client";
import React, { useEffect, useState } from "react";
import { ResendOTPInterval } from "../constants/consts";

interface ResendOTPTimerProps {
  lastResend: number | undefined;
  children: React.ReactNode;
}

export const ResendOTPTimer: React.FC<ResendOTPTimerProps> = ({
  lastResend,
  children,
}) => {
  const [timer, setTimer] = useState(0);
  const resendInterval = ResendOTPInterval * 1000;

  useEffect(() => {
    if (!lastResend) return;

    const currentTime = Date.now();
    const timeElapsed = currentTime - lastResend;

    if (timeElapsed < resendInterval) {
      // In seconds
      const timeLeft = Math.round((resendInterval - timeElapsed) / 1000);
      setTimer(timeLeft);

      const intervalId = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [lastResend]);

  return (
    <>
      {timer === 0 ? (
        children
      ) : (
        <p className="text-sm text-themeBlue font-roboto">Resend in {timer}</p>
      )}
    </>
  );
};
