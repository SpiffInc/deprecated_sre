import React from "react";
import { render } from "@testing-library/react";
import { ProgressBarV2 } from "./ProgressBarV2";

// most of the tests were covered in V1, no need to duplicate them
describe("ProgressBarV2", () => {
  it("renders the buttons correctly", () => {
    const { getByText } = render(<ProgressBarV2 />);
    expect(getByText("Start Request With Breakpoints")).toBeInTheDocument();
    expect(getByText("Finish Request")).toBeInTheDocument();
  });
});
