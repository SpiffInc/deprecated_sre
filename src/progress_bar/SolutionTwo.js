import React from "react";
import { createPortal } from "react-dom";
import reducer, {
  DURATION,
  HANG_AT_MS,
  HANG_AT_PERC,
  initialState,
} from "./reducer";
import { clamp } from "./utils";

export default function SolutionTwo({ breakpoints = [] }) {
  /**
   * TIMELINE:
   * [-------|--------------|------------------------|------------|-]
   * I want to set the "width" of the bar to the next breakpoint, and let transitions
   * ease us to it. When elapsedPerc is past that, set "width" to the next breakpoint.
   * And so on. Part of the trouble is, we need to know how long each segment should take.
   * Let's calculate them upfront.
   *
   * This transition strategy is probably better than SolutionOne's implementation,
   * since we only mutate the DOM at breakpoints. However, both solutions could probably
   * be improved by either using setTimeout to estimate when we should apply styles next,
   * or by using css variables and a single transition or animation. Either way,
   * calling the reducer every frame is surely overkill.
   *
   * Breakpoints get filled out with start, hang, and end points.
   */
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const prgRef = React.useRef();
  const prgId = "solution-progress-bar";

  // initializing breakpoints
  breakpoints = [0, ...breakpoints, HANG_AT_PERC, 1];
  const breakpointsWithTransitionDuration = breakpoints.map((perc, idx) => {
    const ms = perc * DURATION;
    const lastMs = (breakpoints[idx - 1] || 0) * DURATION;
    return {
      breakpoint: perc,
      ms: ms,
      msSinceLastBreakpoint: ms - lastMs,
    };
  });

  const elapsedMs = state.value * DURATION;
  const nextBreakPoint = breakpointsWithTransitionDuration.find((b) => {
    if (state.status === "finished") {
      return b.ms === DURATION;
    } else {
      return b.ms >= clamp(elapsedMs, 0, HANG_AT_MS);
    }
  });
  const barWidth = nextBreakPoint.breakpoint;
  const barTransitionMs = nextBreakPoint.msSinceLastBreakpoint;

  // Ticks every anim frame. This isn't the most performant way of doing
  // animation in react. A CSS animation might make more sense.
  const frameRef = React.useRef();
  React.useEffect(() => {
    frameRef.current = requestAnimationFrame(() => {
      if (state.status === "busy" && state.value <= HANG_AT_PERC) {
        dispatch({ type: "TICK" });
      }
    });
    return () => cancelAnimationFrame(frameRef.current);
  }, [state.status, state.value]);

  // When progress completes, schedule the removal of the bar so it's not in the
  // DOM for screen readers. I'm not 100% sure we need useCallback here, but I
  // want to be sure the same function gets used in add/remove eventlisteners
  // calls in the effect below
  const animationEndHandler = React.useCallback(
    () => dispatch({ type: "RESET" }),
    []
  );
  React.useEffect(() => {
    let lastPrgRef = prgRef.current;
    if (state.status === "finished" && prgRef.current) {
      prgRef.current.addEventListener("animationend", animationEndHandler);
    }
    return () => {
      if (lastPrgRef) {
        lastPrgRef.removeEventListener("animationend", animationEndHandler);
      }
    };
  }, [state.status, animationEndHandler]);

  return (
    <div aria-busy={state.status === "busy"} aria-describedby={prgId}>
      {state.status !== "idle" && (
        <RequestProgressBarTwo
          className={state.status}
          durationMs={barTransitionMs}
          id={prgId}
          ref={prgRef}
          value={state.value}
          displayValue={barWidth}
        />
      )}
      <div className="progress-controls">
        <button
          type="button"
          className="btn"
          onClick={() => dispatch({ type: "START" })}
        >
          Start Request
        </button>
        <button
          type="button"
          className="btn btn-red"
          onClick={() => dispatch({ type: "FINISH" })}
        >
          Finish Request
        </button>
      </div>
    </div>
  );
}

const RequestProgressBarTwo = React.forwardRef(
  ({ className = "", displayValue, durationMs, id, value }, ref) => {
    const clampedValue = clamp(value, 0, 1);
    const valueNow = clampedValue * 100;

    // this is just for setting the actual width
    const clampledDisplayValue = clamp(displayValue || value, 0, 1);
    const translateX = (1 - clampledDisplayValue) * 100;

    return createPortal(
      <div
        aria-valuenow={valueNow}
        aria-valuemin="0"
        aria-valuemax="100"
        className={`${className} request-progress-bar`}
        id={id}
        ref={ref}
        role="progressbar"
        style={{
          transform: `translate3d(-${translateX}%, 0, 0)`,
          transition: `all ${durationMs}ms ease-in-out`,
        }}
      />,
      document.body
    );
  }
);
