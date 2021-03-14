import React from 'react'
import { fireEvent, render, wait } from "@testing-library/react";
import { Solution } from "./ProgressBarExercise";

describe("ProgressBarExercise Solution", () => {
  it("renders the buttons correctly", () => {
    const { getByText } = render(<Solution />);
    expect(getByText("Start Request")).toBeInTheDocument();
    expect(getByText("Finish Request")).toBeInTheDocument();
  });

  it('shows progress bar after clicking start request', async () => {
    const { getByText, getByRole } = render(<Solution />);
    const startRequestBtn = getByText("Start Request")
    fireEvent.click(startRequestBtn)
    await wait(() => {
      expect(getByRole("progressbar")).toBeInTheDocument();
    });
  })

  it('removes progress bar after clicking finish request', async () => {
    const { getByText, queryByRole } = render(<Solution />);
    const finishRequestBtn = getByText("Finish Request")
    fireEvent.click(finishRequestBtn)
    await wait(() => {
      expect(queryByRole("progressbar")).not.toBeInTheDocument();
    });
  })

  it('adds transition styling when finishing the request', () => {
    const { getByText, getByRole } = render(<Solution />);
    const finishRequestBtn = getByText("Finish Request")
    fireEvent.click(finishRequestBtn)
    expect(getByRole("progressbar")).toHaveStyle('transition: width 1s ease, opacity 3s ease-in-out')
  })
});
