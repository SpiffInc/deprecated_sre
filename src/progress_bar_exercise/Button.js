import React from "react";

import "./button.scss";

function Button({ text, action, disable, start }) {
  const finishClass = !start ? "start-button" : "finish-button";

  return (
    <button
      disabled={disable}
      onClick={() => action()}
      className={`button ${finishClass}`}
    >
      {text}
    </button>
  );
}

export default Button;
