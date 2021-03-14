import React from "react";
import { createPortal } from "react-dom";

export const ProgressBar = ({ currentPercentage }) => {
  const finished = currentPercentage === 100;
  return createPortal(
    <div
      style={{
        width: `${currentPercentage}%`,
        transition: finished ? "width 1s ease, opacity 3s ease-in-out" : undefined,
        opacity: finished ? 0 : 1,
      }}
      className="progress-bar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={currentPercentage}
      role="progressbar"
    />,
    document.body
  );
};
