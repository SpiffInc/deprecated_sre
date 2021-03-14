import React, { useCallback, useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { WarningBtn, DefaultBtn } from "../shared-components/Button";

const REQUEST_DURATION = 15000;
const STOP_PERCENTAGE = 90;
const PROGRESS_BAR_FADEOUT = 3000;

export const ProgressBarV1 = () => {
  const [progressBarState, setProgressBarState] = useState({
    percentage: 0,
    startTime: null,
  });

  const requestRef = useRef();
  const previousTimeRef = useRef();
  const fadetimeout = useRef();
  const isProgressVisible = progressBarState.percentage > 0;
  const isProgressFinished = progressBarState.percentage === 100;

  const animate = useCallback(
    (time) => {
      if (
        previousTimeRef.current !== undefined &&
        progressBarState.percentage < STOP_PERCENTAGE
      ) {
        const timePassed = Date.now() - progressBarState.startTime;

        setProgressBarState({
          ...progressBarState,
          percentage: (timePassed * 100) / REQUEST_DURATION,
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [progressBarState]
  );

  useEffect(() => {
    if (isProgressVisible && !isProgressFinished) {
      clearTimeout(fadetimeout.current);
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => { 
      clearTimeout(fadetimeout.current);
      cancelAnimationFrame(requestRef.current) 
    };
  }, [isProgressVisible, isProgressFinished, requestRef, animate]);

  const startProgressBar = () =>
    setProgressBarState({
      percentage: 0.1,
      startTime: Date.now(),
    });

  const stopProgressBar = () => {
    setProgressBarState({
      percentage: 100,
      startTime: null,
    });
    fadetimeout.current = setTimeout(resetProgressBar, PROGRESS_BAR_FADEOUT);
  };

  const resetProgressBar = () =>
    setProgressBarState({
      ...progressBarState,
      percentage: 0,
    });

  return (
    <>
      {isProgressVisible && (
        <ProgressBar currentPercentage={progressBarState.percentage} />
      )}
      <DefaultBtn
        title={
          isProgressVisible && !isProgressFinished
            ? "Loading..."
            : "Start Request"
        }
        onClick={startProgressBar}
      />
      <WarningBtn title="Finish Request" onClick={stopProgressBar} />
    </>
  );
};
