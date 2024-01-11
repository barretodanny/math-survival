import {
  ADDITION_EASY_INCREMENT_INTERVAL,
  ADDITION_HARD_INCREMENT_INTERVAL,
  ADDITION_NORMAL_INCREMENT_INTERVAL,
  DifficultyOptions,
  MULTIPLICATION_EASY_INCREMENT_INTERVAL,
  MULTIPLICATION_HARD_INCREMENT_INTERVAL,
  MULTIPLICATION_NORMAL_INCREMENT_INTERVAL,
  MathModeOptions,
  SUBTRACTION_EASY_INCREMENT_INTERVAL,
  SUBTRACTION_HARD_INCREMENT_INTERVAL,
  SUBTRACTION_NORMAL_INCREMENT_INTERVAL,
} from "../constants/game";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSign(mm: MathModeOptions) {
  if (mm === MathModeOptions.ADDITION) {
    return "+";
  } else if (mm === MathModeOptions.SUBTRACTION) {
    return "-";
  } else if (mm === MathModeOptions.MULTIPLICATION) {
    return "x";
  } else {
    return "+";
  }
}

function getAnswer(n1: number, n2: number, mm: MathModeOptions) {
  if (mm === MathModeOptions.ADDITION) {
    return n1 + n2;
  } else if (mm === MathModeOptions.SUBTRACTION) {
    return n1 - n2;
  } else if (mm === MathModeOptions.MULTIPLICATION) {
    return n1 * n2;
  } else {
    return n1 + n2;
  }
}

export function generateQuestion(
  mm: MathModeOptions,
  min: number,
  max: number
) {
  const n1 = getRandomInt(min, max);
  const n2 = getRandomInt(min, max);
  const sign = getSign(mm);
  const answer = getAnswer(n1, n2, mm);
  return { n1, n2, sign, answer };
}

export function shouldIncrementMinMax(
  mathMode: MathModeOptions,
  difficulty: DifficultyOptions,
  score: number
) {
  switch (mathMode) {
    case MathModeOptions.ADDITION:
      switch (difficulty) {
        case DifficultyOptions.EASY:
          console.log("first");
          return score % ADDITION_EASY_INCREMENT_INTERVAL === 0;
        case DifficultyOptions.NORMAL:
          return score % ADDITION_NORMAL_INCREMENT_INTERVAL === 0;
        case DifficultyOptions.HARD:
          return score % ADDITION_HARD_INCREMENT_INTERVAL === 0;
      }
    case MathModeOptions.SUBTRACTION:
      switch (difficulty) {
        case DifficultyOptions.EASY:
          return score % SUBTRACTION_EASY_INCREMENT_INTERVAL === 0;
        case DifficultyOptions.NORMAL:
          return score % SUBTRACTION_NORMAL_INCREMENT_INTERVAL === 0;
        case DifficultyOptions.HARD:
          return score % SUBTRACTION_HARD_INCREMENT_INTERVAL === 0;
      }
    case MathModeOptions.MULTIPLICATION:
      switch (difficulty) {
        case DifficultyOptions.EASY:
          return score % MULTIPLICATION_EASY_INCREMENT_INTERVAL === 0;
        case DifficultyOptions.NORMAL:
          return score % MULTIPLICATION_NORMAL_INCREMENT_INTERVAL === 0;
        case DifficultyOptions.HARD:
          return score % MULTIPLICATION_HARD_INCREMENT_INTERVAL === 0;
      }
  }
}
