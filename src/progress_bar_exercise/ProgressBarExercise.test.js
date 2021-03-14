import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Solution } from "./ProgressBarExercise";

describe("ProgressBarExercise Solution", () => {
  it("toggles solutions correctly", () => {
    const { getByText } = render(<Solution />);

    expect(getByText("Start Request")).toBeInTheDocument();
    fireEvent.click(getByText("Toggle Solution"));
    expect(getByText("Start Request With Breakpoints")).toBeInTheDocument();
  });
});
