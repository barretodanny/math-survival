import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MathModeOptions, DifficultyOptions } from "../../constants/options";

export interface OptionsState {
  mathMode: MathModeOptions;
  difficulty: DifficultyOptions;
}

const initialState: OptionsState = {
  mathMode: MathModeOptions.MULTIPLICATION,
  difficulty: DifficultyOptions.NORMAL,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
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
  },
});

export const {
  setMathModeToAddition,
  setMathModeToSubtraction,
  setMathModeToMultiplication,
  setDifficultyToEasy,
  setDifficultyToNormal,
  setDifficultyToHard,
} = optionsSlice.actions;

export const selectMathModeOption = (state: RootState) =>
  state.options.mathMode;
export const selectDifficultyOption = (state: RootState) =>
  state.options.difficulty;

export default optionsSlice.reducer;
