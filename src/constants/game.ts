export const INITIAL_GAME_TIMER = 60;
export const INITIAL_MIN = 0;
export const INITIAL_MAX = 5;
// increment intervals determine after how many questions will the min/max inc
export const EASY_INCREMENT_INTERVAL = 20;
export const NORMAL_INCREMENT_INTERVAL = 17;
export const HARD_INCREMENT_INTERVAL = 14;

export enum MathModeOptions {
  ADDITION = "ADDITION",
  SUBTRACTION = "SUBTRACTION",
  MULTIPLICATION = "MULTIPLICATION",
}

export enum DifficultyOptions {
  EASY = "EASY",
  NORMAL = "NORMAL",
  HARD = "HARD",
}
