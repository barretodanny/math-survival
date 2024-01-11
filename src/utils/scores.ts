import { DifficultyOptions, MathModeOptions } from "../constants/game";

export function generateGameString(
  mathMode: MathModeOptions,
  difficulty: DifficultyOptions
) {
  let gameString = "";

  switch (mathMode) {
    case MathModeOptions.ADDITION:
      gameString += "A-";
      break;
    case MathModeOptions.SUBTRACTION:
      gameString += "S-";
      break;
    case MathModeOptions.MULTIPLICATION:
      gameString += "M-";
      break;
  }

  switch (difficulty) {
    case DifficultyOptions.EASY:
      gameString += "E";
      break;
    case DifficultyOptions.NORMAL:
      gameString += "N";
      break;
    case DifficultyOptions.HARD:
      gameString += "H";
      break;
  }

  return gameString;
}
