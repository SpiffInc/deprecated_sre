import { reducer } from "./ProgressBar";

test("initial status is `idle`", () => {
  const state = reducer();
  expect(state.status).toBe("idle");
});

test("START should set status to `busy`", () => {
  const state = pipe(dispatch({ type: "START" }))(reducer());
  expect(state.status).toBe("busy");
});

test("TICK should increment value", () => {
  const initialState = reducer();
  const nextState = pipe(
    dispatch({ type: "START", payload: 0 }),
    dispatch({ type: "TICK", payload: 1 })
  )(initialState);
  expect(nextState.value).toBeGreaterThan(initialState.value);
  expect(nextState.status).toBe("busy");
});

test("FINISH should set value to 1", () => {
  const state = pipe(
    dispatch({ type: "START" }),
    dispatch({ type: "TICK" }),
    dispatch({ type: "FINISH" })
  )(reducer());
  expect(state.value).toBe(1);
  expect(state.status).toBe("finished");
});

test("FINISH should set value to even if idle", () => {
  const state = pipe(dispatch({ type: "FINISH" }))(reducer());
  expect(state.value).toBe(1);
  expect(state.status).toBe("finished");
});

test("RESET should reset from finished", () => {
  const state = pipe(
    dispatch({ type: "START" }),
    dispatch({ type: "TICK" }),
    dispatch({ type: "FINISH" }),
    dispatch({ type: "RESET" })
  )(reducer());
  expect(state.value).toBe(0);
  expect(state.status).toBe("idle");
});

test("RESET should reset from busy", () => {
  const state = pipe(
    dispatch({ type: "START" }),
    dispatch({ type: "TICK" }),
    dispatch({ type: "RESET" })
  )(reducer());
  expect(state.value).toBe(0);
  expect(state.status).toBe("idle");
});

test("RESET should reset from idle", () => {
  const state = pipe(dispatch({ type: "RESET" }))(reducer());
  expect(state.value).toBe(0);
  expect(state.status).toBe("idle");
});

/**
 * Helpers
 */

const pipe = (...fns) => (state) => {
  return fns.reduce((acc, fn) => fn(acc), state);
};

const dispatch = (action) => (state) => {
  return reducer(state, action);
};
