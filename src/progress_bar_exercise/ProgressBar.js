import React from "react";

import ProgressState from "./ProgressState";

import "./progressBar.scss";

function ProgressBar({ progress }) {
  const hideProgressBar = progress >= 100 && "hide";

  return (
    <div className={`progress-bar ${hideProgressBar}`}>
      <span>{progress}%</span>
      <ProgressState progress={progress} />
    </div>
  );
}

export default ProgressBar;
