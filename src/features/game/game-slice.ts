import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  DifficultyOptions,
  MathModeOptions,
  INITIAL_GAME_TIMER,
  INITIAL_MAX,
  INITIAL_MIN,
} from "../../constants/game";
import { QuestionType } from "../../types/game";
import { generateQuestion } from "../../utils/game";

export interface GameState {
  mathMode: MathModeOptions;
  difficulty: DifficultyOptions;
  gameTimer: number;
  score: number;
  min: number;
  max: number;
  previousQuestion: QuestionType | undefined;
  currentQuestion: QuestionType | undefined;
  nextQuestions: [QuestionType, QuestionType, QuestionType] | undefined;
  userAnswer: string | undefined;
}

const initialState: GameState = {
  mathMode: MathModeOptions.MULTIPLICATION,
  difficulty: DifficultyOptions.NORMAL,
  gameTimer: INITIAL_GAME_TIMER,
  score: 0,
  min: INITIAL_MIN,
  max: INITIAL_MAX,
  previousQuestion: undefined,
  currentQuestion: undefined,
  nextQuestions: undefined,
  userAnswer: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: (state) => {
      (state.gameTimer = INITIAL_GAME_TIMER),
        (state.score = 0),
        (state.min = INITIAL_MIN),
        (state.max = INITIAL_MAX),
        (state.previousQuestion = undefined),
        (state.currentQuestion = generateQuestion(
          state.mathMode,
          INITIAL_MIN,
          INITIAL_MAX
        )),
        (state.nextQuestions = [
          generateQuestion(state.mathMode, INITIAL_MIN, INITIAL_MAX),
          generateQuestion(state.mathMode, INITIAL_MIN, INITIAL_MAX),
          generateQuestion(state.mathMode, INITIAL_MIN, INITIAL_MAX),
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
      if (state.currentQuestion!.answer === parseInt(action.payload)) {
        state.score += 1;
        state.gameTimer += 1;
        state.userAnswer = undefined;
        // determine is min/max should increment
        state.previousQuestion = state.currentQuestion;
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
export const selectGamePreviousQuestion = (state: RootState) =>
  state.game.previousQuestion;
export const selectGameCurrentQuestion = (state: RootState) =>
  state.game.currentQuestion;
export const selectGameNextQuestions = (state: RootState) =>
  state.game.nextQuestions;
export const selectGameUserAnswer = (state: RootState) => state.game.userAnswer;

export default gameSlice.reducer;
