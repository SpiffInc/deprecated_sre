import React, { useState } from "react";
import Exercise from "../exercise/Exercise";
import { ProgressBarV1 } from "../shared-components/ProgressBarV1";
import { ProgressBarV2 } from "../shared-components/ProgressBarV2";
import { DefaultBtn } from "../shared-components/Button";

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

export const Solution = () => {
  const [solution, setSolution] = useState(1);

  const toggleSolution = () =>
    setSolution((prevSolution) => {
      if (prevSolution === 1) return 2;
      if (prevSolution === 2) return 1;
    });

  return (
    <>
      <DefaultBtn title="Toggle Solution" onClick={toggleSolution} />
      {solution === 1 ? <ProgressBarV1 /> : <ProgressBarV2 />}
    </>
  );
};
