import { DifficultyOptions, MathModeOptions } from "../constants/game";
import { ScoresSortOrder } from "../constants/scores";
import { Score } from "../types/scores";

// game string is used for saving scores for each mathmode/difficulty combination
// represents the math mode (A/S/M for Addition/Subtraction/Multiplication)
// and represents difficulty (E/N/H for Easy/Normal/Hard)
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

// a score is saved in the following form:
// USERNAME_SCORE_DATE
// scores are saving as a string, with each score separated by a comma
// SCORE,SCORE,SCORE
export function parseScores(scoresString: string): Score[] {
  // no score saved
  if (!scoresString) {
    return [];
  }

  // for score id to pass as key in ScoreItem
  let i = 0;

  // if score string does not contain a comma there is only 1 score, otherwise multiple scores
  if (!scoresString.includes(",")) {
    // score form: USERNAME_SCORE_DATE
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
    // score string form: SCORE,SCORE,SCORE...
    scoresString.split(",").map((ss) => {
      // score form: USERNAME_SCORE_DATE
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
    // ascending 0-9 A-Z
    case ScoresSortOrder.USERNAME:
      return sortScoresByUsername(scores, true);
    case ScoresSortOrder.USERNAME_REVERSE:
      return sortScoresByUsername(scores, false);
    // ascending 0,1,2...
    case ScoresSortOrder.SCORE:
      return sortScoresByScore(scores, false);
    case ScoresSortOrder.SCORE_REVERSE:
      return sortScoresByScore(scores, true);
    // earliest to latest
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
