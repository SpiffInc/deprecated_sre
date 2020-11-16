import React from "react";

import "./progressState.scss";

function ProgressState({ progress }) {
  return (
    <>
      <div className="progress-state" style={{ width: `${progress}%` }} />
    </>
  );
}

export default ProgressState;
