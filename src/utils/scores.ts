import { DifficultyOptions, MathModeOptions } from "../constants/game";
import { ScoresSortOrder } from "../constants/scores";
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

  let i = 0;

  if (!scoresString.includes(",")) {
    const s = scoresString.split("_");
    const score: Score = {
      username: s[0],
      score: parseInt(s[1]),
      date: s[2],
      id: i++,
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
        id: i++,
      };
      scores.push(score);
    });
    return scores;
  }
}

export function getTimeAgo(createdAt: string) {
  const now = new Date(); // Current date and time
  const createdAtDate = new Date(createdAt); // Convert the string to a Date object

  // Calculate the time difference in milliseconds
  const timeDiff = now.getTime() - createdAtDate.getTime();

  // Convert the time difference to minutes, hours, or days
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Return the appropriate time ago format
  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return minutes + " minutes ago";
  } else if (hours < 24) {
    return hours + " hours ago";
  } else {
    return days + " days ago";
  }
}

export const sortScores = (sort: ScoresSortOrder, scores: Score[]) => {
  switch (sort) {
    case ScoresSortOrder.USERNAME:
      return sortScoresByUsername(scores, true);
    case ScoresSortOrder.USERNAME_REVERSE:
      return sortScoresByUsername(scores, false);
    case ScoresSortOrder.SCORE:
      return sortScoresByScore(scores, false);
    case ScoresSortOrder.SCORE_REVERSE:
      return sortScoresByScore(scores, true);
    case ScoresSortOrder.DATE:
      return sortScoresByDate(scores, false);
    case ScoresSortOrder.DATE_REVERSE:
      return sortScoresByDate(scores, true);
    default:
      return scores;
  }
};

function sortScoresByUsername(scores: Score[], alphabetical: boolean) {
  scores.sort(function (x, y) {
    let usernameX = x.username;
    let usernameY = y.username;

    if (alphabetical) {
      return usernameX === usernameY ? 0 : usernameX < usernameY ? -1 : 1;
    } else {
      return usernameX === usernameY ? 0 : usernameX < usernameY ? 1 : -1;
    }
  });

  return scores;
}

function sortScoresByScore(scores: Score[], highestFirst: boolean) {
  scores.sort(function (x, y) {
    let scoreX = x.score;
    let scoreY = y.score;

    if (highestFirst) {
      return scoreX === scoreY ? 0 : scoreX < scoreY ? 1 : -1;
    } else {
      return scoreX === scoreY ? 0 : scoreX < scoreY ? -1 : 1;
    }
  });

  return scores;
}

function sortScoresByDate(scores: Score[], latestFirst: boolean) {
  scores.sort(function (x, y) {
    let dateX = Date.parse(x.date);
    let dateY = Date.parse(y.date);

    // compare dates
    if (latestFirst) {
      return dateX === dateY ? 0 : dateX < dateY ? -1 : 1;
    } else {
      return dateX === dateY ? 0 : dateX < dateY ? 1 : -1;
    }
  });
  return scores;
}
