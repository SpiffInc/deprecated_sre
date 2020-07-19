import React from "react";
import { createPortal } from "react-dom";
import Exercise from "../exercise/Exercise";
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

// 15 seconds
const DURATION = 15000;
const HANG_AT_PERC = 0.9;
const HANG_AT_MS = DURATION * HANG_AT_PERC;

const initialState = {
  status: "idle",
  value: 0,
  startTime: null,
};

const Solution = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const prgRef = React.useRef();
  const prgId = "solution-progress-bar";

  // Ticks every anim frame. This isn't the most performant way of doing
  // animation in react. A CSS animation might make more sense.
  React.useEffect(() => {
    requestAnimationFrame(() => {
      if (state.status === "busy" && state.value <= HANG_AT_PERC) {
        dispatch({ type: "TICK" });
      }
    });
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
        <RequestProgressBar
          className={state.status}
          id={prgId}
          ref={prgRef}
          value={state.value}
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
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "START":
      const now = action.payload === undefined ? Date.now() : action.payload;
      return {
        ...state,
        startTime: now,
        status: "busy",
        value: 0,
      };

    case "TICK":
      if (state.status === "busy") {
        const now = action.payload === undefined ? Date.now() : action.payload;
        const delta = now - state.startTime;
        return {
          ...state,
          value: clamp(delta / DURATION, 0, HANG_AT_MS),
        };
      } else {
        return state;
      }

    case "FINISH":
      if (state.status !== "finished") {
        return {
          ...state,
          value: 1.0,
          status: "finished",
        };
      } else {
        return state;
      }

    case "RESET":
      return {
        ...state,
        value: 0.0,
        status: "idle",
      };

    default:
      return state;
  }
}

/**
 * type RequestProgressBarProps = {
 *  id: string;
 *  value: number; // between 0 - 1
 * }
 *
 * This is the actual progress bar that gets rendered. It's a pure component,
 * all the state for this exercise is handled by the parent.
 *
 * Some things to note: it uses translate3d to position part of the bar offscreen
 * to the left. This is more performant than animating width, and strangely I
 * was getting visual bugs in Chrome when trying to animate scaleX.
 *
 * By default, there's no transition. The javascript ticks every second and updates
 * the bar, so the animation should be smooth. However, when we finish, and set
 * the value to 1, we do apply a transition effect so it smoothly animates to
 * its final state.
 *
 * We also provide a ref to the actual DOM element to the application so we can
 * listen for when the removal animation finishes, triggering the component
 * cleanup step.
 *
 * The bar is rendered with a Portal. Since it's deep in an app, if any of its
 * ancestors has `overflow: hidden`, it will not be visible. Instead, the portal
 * appends the bar directly to the body.
 */

const RequestProgressBar = React.forwardRef(
  ({ className = "", id, value }, ref) => {
    const clampedValue = clamp(value, 0, 1);
    const valueNow = clampedValue * 100;
    const translateX = (1 - clampedValue) * 100;

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
          transition: clampedValue === 1 ? "all 1s ease-in-out" : "",
        }}
      />,
      document.body
    );
  }
);

// UTILS

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}
