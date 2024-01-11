import { DifficultyOptions, MathModeOptions } from "../constants/game";
import { Score } from "../types/scores";

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

export function parseScores(scoresString: string): Score[] {
  if (!scoresString) {
    return [];
  }

  if (!scoresString.includes(",")) {
    const s = scoresString.split("_");
    const score: Score = {
      username: s[0],
      score: parseInt(s[1]),
      date: s[2],
    };
    return [score];
  } else {
    const scores: Score[] = [];
    scoresString.split(",").map((ss) => {
      const s = ss.split("_");
      const score: Score = {
        username: s[0],
        score: parseInt(s[1]),
        date: s[2],
      };
      scores.push(score);
    });
    return scores;
  }
}
