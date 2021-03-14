import React from 'react'
import { fireEvent, render, wait } from "@testing-library/react";
import { ProgressBarV1 } from './ProgressBarV1'

describe("ProgressBarV1", () => {
  it("renders the buttons correctly", () => {
    const { getByText } = render(<ProgressBarV1 />);
    expect(getByText("Start Request")).toBeInTheDocument();
    expect(getByText("Finish Request")).toBeInTheDocument();
  });

  it('shows progress bar after clicking start request', async () => {
    const { getByText, getByRole } = render(<ProgressBarV1 />);
    const startRequestBtn = getByText("Start Request")
    fireEvent.click(startRequestBtn)
    await wait(() => {
      expect(getByRole("progressbar")).toBeInTheDocument();
    });
  })

  it('removes progress bar after clicking finish request', async () => {
    const { getByText, queryByRole } = render(<ProgressBarV1 />);
    const finishRequestBtn = getByText("Finish Request")
    fireEvent.click(finishRequestBtn)
    await wait(() => {
      expect(queryByRole("progressbar")).not.toBeInTheDocument();
    });
  })

  it('adds transition styling when finishing the request', () => {
    const { getByText, getByRole } = render(<ProgressBarV1 />);
    const finishRequestBtn = getByText("Finish Request")
    fireEvent.click(finishRequestBtn)
    expect(getByRole("progressbar")).toHaveStyle('transition: width 1s ease, opacity 3s ease-in-out')
  })
});
