import React, { useState, useEffect } from "react";
import Exercise from "../exercise/Exercise";

// components
import ProgressBar from "./ProgressBar";
import Button from "./Button";

import "./progressBarExercise.scss";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/CommissionAI/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [progress, setProgress] = useState(0);
  const [start, setStart] = useState(false);
  const [text, setText] = useState("Start Request");

  useEffect(() => {
    if (progress > 1 && progress < 90) {
      getRequestStatus();
      setText("...Loading");
    }

    if (progress >= 100) {
      setTimeout(() => {
        setStart(false);
        setProgress(0);
      }, 3000);
    }
  }, [progress]);

  function startRequest() {
    const startProgress = 3;
    setStart(true);
    setProgress(startProgress);
  }

  function getRequestStatus() {
    setTimeout(() => {
      const percent = progress;
      const updatedPercent = percent + 3;

      setProgress(updatedPercent);
    }, 500);
  }

  function finishRequest() {
    setText("Start Request");
    setProgress(100);
  }

  return (
    <div className="progress-container">
      <ProgressBar progress={progress} />
      <Button
        disable={progress > 0 ? true : false}
        text={text}
        start={start}
        action={startRequest}
      />
      <Button
        disable={progress < 90 ? true : false}
        text={"Finish Request"}
        action={finishRequest}
      />
    </div>
  );
};
