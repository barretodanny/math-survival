export const INITIAL_GAME_TIMER = 60;
// ADDITION MODE
export const INITIAL_ADDITION_MIN = 0;
export const INITIAL_ADDITION_MAX = 20;
export const ADDITION_EASY_INCREMENT_INTERVAL = 10;
export const ADDITION_NORMAL_INCREMENT_INTERVAL = 8;
export const ADDITION_HARD_INCREMENT_INTERVAL = 6;
// SUBTRACTION MODE
export const INITIAL_SUBTRACTION_MIN = 0;
export const INITIAL_SUBTRACTION_MAX = 15;
export const SUBTRACTION_EASY_INCREMENT_INTERVAL = 14;
export const SUBTRACTION_NORMAL_INCREMENT_INTERVAL = 11;
export const SUBTRACTION_HARD_INCREMENT_INTERVAL = 8;
// MULTIPLICATION MODE
export const INITIAL_MULTIPLICATION_MIN = 0;
export const INITIAL_MULTIPLICATION_MAX = 5;
export const MULTIPLICATION_EASY_INCREMENT_INTERVAL = 20;
export const MULTIPLICATION_NORMAL_INCREMENT_INTERVAL = 17;
export const MULTIPLICATION_HARD_INCREMENT_INTERVAL = 14;

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
