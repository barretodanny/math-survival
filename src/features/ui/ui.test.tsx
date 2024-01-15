import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import {
  showCountdownScreen,
  showGameScreen,
  showPostGameScreen,
} from "./ui-slice";
import {
  incrementCountdownTimer,
  toggleAutoSave,
} from "../settings/settings-slice";
import {
  reset,
  setMathModeToAddition,
  setMathModeToMultiplication,
  setMathModeToSubtraction,
  updateUserAnswer,
} from "../game/game-slice";

import App from "../../App";

test("renders app header", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Mad Minute Survival/i)).toBeInTheDocument();
});

test("renders setup screen by default", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Choose Math Mode/i)).toBeInTheDocument();
  expect(getByText(/Choose Difficulty/i)).toBeInTheDocument();
});

test("renders countdown screen with default countdown timer of 3", () => {
  store.dispatch(showCountdownScreen());
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Starting in.../i)).toBeInTheDocument();
  expect(getByText(/3/i)).toBeInTheDocument();
});

test("renders countdown screen with saved countdown timer", () => {
  store.dispatch(incrementCountdownTimer());
  store.dispatch(showCountdownScreen());
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Starting in.../i)).toBeInTheDocument();
  expect(getByText(/4/i)).toBeInTheDocument();
});

test("renders game screen, with timer set to 60, and score set to 0", () => {
  store.dispatch(showGameScreen());
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Timer: 60/i)).toBeInTheDocument();
  expect(getByText(/Score: 0/i)).toBeInTheDocument();
  expect(getByText(/Min:/i)).toBeInTheDocument();
  expect(getByText(/Max:/i)).toBeInTheDocument();
  expect(getByText(/Quit/i)).toBeInTheDocument();
});

test("renders game screen, with min 0 max 20 for addition mode", () => {
  store.dispatch(setMathModeToAddition());
  store.dispatch(reset());
  store.dispatch(showGameScreen());
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Min: 0/i)).toBeInTheDocument();
  expect(getByText(/Max: 20/i)).toBeInTheDocument();
});

test("renders game screen, with min 0 max 15 for subtraction mode", () => {
  store.dispatch(setMathModeToSubtraction());
  store.dispatch(reset());
  store.dispatch(showGameScreen());
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Min: 0/i)).toBeInTheDocument();
  expect(getByText(/Max: 15/i)).toBeInTheDocument();
});

test("renders game screen, with min 0 max 5 for multiplication mode", () => {
  store.dispatch(setMathModeToMultiplication());
  store.dispatch(reset());
  store.dispatch(showGameScreen());
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Min: 0/i)).toBeInTheDocument();
  expect(getByText(/Max: 5/i)).toBeInTheDocument();
});

test("renders post game screen", () => {
  store.dispatch(showPostGameScreen());
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/You survived 60 seconds/i)).toBeInTheDocument();
  expect(getByText(/Final Score: 0/i)).toBeInTheDocument();
});

test("renders post game screen with correct final score and time survived", () => {
  store.dispatch(setMathModeToMultiplication());
  store.dispatch(reset());
  store.dispatch(showGameScreen());

  let a = store.getState().game.currentQuestion?.answer;
  store.dispatch(updateUserAnswer(String(a)));
  store.dispatch(showPostGameScreen());

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/You survived 61 seconds/i)).toBeInTheDocument();
  expect(getByText(/Final Score: 1/i)).toBeInTheDocument();
});

test("renders post game screen and prompts user to save score if autoSave disabled", () => {
  store.dispatch(showPostGameScreen());

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Would you like to save this score?/i)).toBeInTheDocument();
});

test("renders post game screen and tells user score has been saved if autoSave enabled", () => {
  store.dispatch(toggleAutoSave());
  store.dispatch(showPostGameScreen());

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(
    getByText(/Score has been automatically saved under/i)
  ).toBeInTheDocument();
  expect(
    getByText(/You can change this in the settings./i)
  ).toBeInTheDocument();
});
