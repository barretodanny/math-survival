import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  DifficultyOptions,
  MathModeOptions,
  INITIAL_GAME_TIMER,
  INITIAL_MULTIPLICATION_MIN,
  INITIAL_MULTIPLICATION_MAX,
  INITIAL_ADDITION_MIN,
  INITIAL_SUBTRACTION_MIN,
  INITIAL_ADDITION_MAX,
  INITIAL_SUBTRACTION_MAX,
} from "../../constants/game";
import { QuestionType } from "../../types/game";
import { generateQuestion, shouldIncrementMinMax } from "../../utils/game";

export interface GameState {
  mathMode: MathModeOptions;
  difficulty: DifficultyOptions;
  gameTimer: number;
  score: number;
  min: number;
  max: number;
  currentQuestion: QuestionType | undefined;
  nextQuestions: [QuestionType, QuestionType, QuestionType] | undefined;
  userAnswer: string | undefined;
}

const initialState: GameState = {
  mathMode: MathModeOptions.MULTIPLICATION,
  difficulty: DifficultyOptions.NORMAL,
  gameTimer: INITIAL_GAME_TIMER,
  score: 0,
  min: INITIAL_MULTIPLICATION_MIN,
  max: INITIAL_MULTIPLICATION_MAX,
  currentQuestion: undefined,
  nextQuestions: undefined,
  userAnswer: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // reset game state such as timer, score, min/max, etc to default values
    reset: (state) => {
      (state.gameTimer = INITIAL_GAME_TIMER),
        (state.score = 0),
        (state.min =
          state.mathMode === MathModeOptions.ADDITION
            ? INITIAL_ADDITION_MIN
            : state.mathMode === MathModeOptions.SUBTRACTION
            ? INITIAL_SUBTRACTION_MIN
            : INITIAL_MULTIPLICATION_MIN),
        (state.max =
          state.mathMode === MathModeOptions.ADDITION
            ? INITIAL_ADDITION_MAX
            : state.mathMode === MathModeOptions.SUBTRACTION
            ? INITIAL_SUBTRACTION_MAX
            : INITIAL_MULTIPLICATION_MAX),
        (state.currentQuestion = generateQuestion(
          state.mathMode,
          state.min,
          state.max
        )),
        (state.nextQuestions = [
          generateQuestion(state.mathMode, state.min, state.max),
          generateQuestion(state.mathMode, state.min, state.max),
          generateQuestion(state.mathMode, state.min, state.max),
        ]),
        (state.userAnswer = undefined);
    },
    setMathModeToAddition: (state) => {
      state.mathMode = MathModeOptions.ADDITION;
    },
    setMathModeToSubtraction: (state) => {
      state.mathMode = MathModeOptions.SUBTRACTION;
    },
    setMathModeToMultiplication: (state) => {
      state.mathMode = MathModeOptions.MULTIPLICATION;
    },
    setDifficultyToEasy: (state) => {
      state.difficulty = DifficultyOptions.EASY;
    },
    setDifficultyToNormal: (state) => {
      state.difficulty = DifficultyOptions.NORMAL;
    },
    setDifficultyToHard: (state) => {
      state.difficulty = DifficultyOptions.HARD;
    },
    decrementGameTimer: (state) => {
      state.gameTimer -= 1;
    },
    updateUserAnswer: (state, action: PayloadAction<string>) => {
      // correct answer, increment score/timer and reset user answer
      if (state.currentQuestion!.answer === parseInt(action.payload)) {
        state.score += 1;
        state.gameTimer += 1;
        state.userAnswer = "";

        // min/max increments based on score and also mathmode/difficulty
        if (
          shouldIncrementMinMax(state.mathMode, state.difficulty, state.score)
        ) {
          state.min += 1;
          state.max += 1;
        }

        state.currentQuestion = state.nextQuestions![0];
        state.nextQuestions = [
          state.nextQuestions![1],
          state.nextQuestions![2],
          generateQuestion(state.mathMode, state.min, state.max),
        ];
      } else {
        state.userAnswer = action.payload;
      }
    },
  },
});

export const {
  reset,
  setMathModeToAddition,
  setMathModeToSubtraction,
  setMathModeToMultiplication,
  setDifficultyToEasy,
  setDifficultyToNormal,
  setDifficultyToHard,
  decrementGameTimer,
  updateUserAnswer,
} = gameSlice.actions;

export const selectMathModeOption = (state: RootState) => state.game.mathMode;
export const selectDifficultyOption = (state: RootState) =>
  state.game.difficulty;
export const selectGameTimer = (state: RootState) => state.game.gameTimer;
export const selectGameScore = (state: RootState) => state.game.score;
export const selectGameMin = (state: RootState) => state.game.min;
export const selectGameMax = (state: RootState) => state.game.max;
export const selectGameCurrentQuestion = (state: RootState) =>
  state.game.currentQuestion;
export const selectGameNextQuestions = (state: RootState) =>
  state.game.nextQuestions;
export const selectGameUserAnswer = (state: RootState) => state.game.userAnswer;

export default gameSlice.reducer;
