import React    from "react"
import Exercise from "../exercise/Exercise"
import ProgressBarComponent from "../components/progressbar.component"

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
    <div>
       {/* <div>Add solution here</div> */}
      <ProgressBarComponent />
    </div>
   
  )
}
