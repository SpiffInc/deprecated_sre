import React from "react";
import Exercise from "../exercise/Exercise";
import SolutionOne from "./SolutionOne";
import SolutionTwo from "./SolutionTwo";
import "./buttons.scss";
import "./progress-bar.scss";

const ProgressBar = () => {
  return (
    <div className="parser">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/CommissionAI/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBar;

// ----------------------------------------------------------------------------------

/**
 * Animates a progress bar to 90% over 15s. Provides a button for completing the
 * bar on demand.
 */

function Solution() {
  const [solution, setSolution] = React.useState("two");

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <label style={{ flexGrow: "1", textAlign: "center" }}>
          <input
            type="radio"
            name="solution"
            value="one"
            checked={solution === "one"}
            onChange={() => setSolution("one")}
          />
          Solution V1
        </label>
        <label style={{ flexGrow: "1", textAlign: "center" }}>
          <input
            type="radio"
            name="solution"
            value="two"
            checked={solution === "two"}
            onChange={() => setSolution("two")}
          />
          Solution V2
        </label>
      </div>
      {solution === "one" ? (
        <SolutionOne />
      ) : (
        <SolutionTwo breakpoints={[0.1, 0.3, 0.5, 0.7, 0.9]} />
      )}
    </div>
  );
}
