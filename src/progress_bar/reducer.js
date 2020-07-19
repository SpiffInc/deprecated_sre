import { clamp } from "./utils";

// 15 seconds
export const DURATION = 15000;
export const HANG_AT_PERC = 0.9;
export const HANG_AT_MS = DURATION * HANG_AT_PERC;

export const initialState = {
  status: "idle",
  value: 0,
  startTime: null,
};

export default function reducer(state = initialState, action = {}) {
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
