import React    from "react"
import Exercise from "../exercise/Exercise"

const ProgressBar = () => {
  return (
    <div className="parser">
      <Exercise
        solution = {<Solution />}
        specsUrl = "https://github.com/CommissionAI/spiff_react_exercises/issues/1"
        title    = "Progress Bar Exercise"
      />
    </div>
  )
}

export default ProgressBar

// ----------------------------------------------------------------------------------

const Solution = () => {
  return (
    // <div>Add solution here</div>
  )
}
