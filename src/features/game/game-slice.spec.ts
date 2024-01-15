import {
  ADDITION_EASY_INCREMENT_INTERVAL,
  ADDITION_HARD_INCREMENT_INTERVAL,
  ADDITION_NORMAL_INCREMENT_INTERVAL,
  DifficultyOptions,
  INITIAL_ADDITION_MAX,
  INITIAL_ADDITION_MIN,
  INITIAL_GAME_TIMER,
  INITIAL_MULTIPLICATION_MAX,
  INITIAL_MULTIPLICATION_MIN,
  INITIAL_SUBTRACTION_MAX,
  INITIAL_SUBTRACTION_MIN,
  MULTIPLICATION_EASY_INCREMENT_INTERVAL,
  MULTIPLICATION_HARD_INCREMENT_INTERVAL,
  MULTIPLICATION_NORMAL_INCREMENT_INTERVAL,
  MathModeOptions,
  SUBTRACTION_EASY_INCREMENT_INTERVAL,
  SUBTRACTION_HARD_INCREMENT_INTERVAL,
  SUBTRACTION_NORMAL_INCREMENT_INTERVAL,
} from "../../constants/game";
import gameReducer, {
  reset,
  setMathModeToAddition,
  setMathModeToSubtraction,
  setMathModeToMultiplication,
  setDifficultyToEasy,
  setDifficultyToNormal,
  setDifficultyToHard,
  decrementGameTimer,
  updateUserAnswer,
  GameState,
} from "./game-slice";

describe("game reducer", () => {
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

  it("should handle initial state", () => {
    expect(gameReducer(undefined, { type: "unknown" })).toEqual({
      mathMode: MathModeOptions.MULTIPLICATION,
      difficulty: DifficultyOptions.NORMAL,
      gameTimer: INITIAL_GAME_TIMER,
      score: 0,
      min: INITIAL_MULTIPLICATION_MIN,
      max: INITIAL_MULTIPLICATION_MAX,
      currentQuestion: undefined,
      nextQuestions: undefined,
      userAnswer: undefined,
    });
  });

  it("should handle resetings the game state to default values", () => {
    const actual = gameReducer(initialState, reset());
    expect(actual.gameTimer).toEqual(INITIAL_GAME_TIMER);
    expect(actual.score).toEqual(0);
    expect(actual.currentQuestion).not.toBe(undefined);
    expect(actual.nextQuestions).not.toBe(undefined);
    expect(actual.nextQuestions?.length).toEqual(3);
    expect(actual.userAnswer).toEqual(undefined);
  });

  it("should handle setting the math mode to addition", () => {
    const actual = gameReducer(initialState, setMathModeToAddition());
    expect(actual.mathMode).toEqual(MathModeOptions.ADDITION);
  });

  it("should handle reset when mathMode is set to ADDITION", () => {
    let actual = gameReducer(initialState, setMathModeToAddition());
    actual = gameReducer(actual, reset());
    expect(actual.min).toEqual(INITIAL_ADDITION_MIN);
    expect(actual.max).toEqual(INITIAL_ADDITION_MAX);
    expect(actual.currentQuestion?.sign).toEqual("+");
  });

  it("should handle setting the math mode to subtraction", () => {
    const actual = gameReducer(initialState, setMathModeToSubtraction());
    expect(actual.mathMode).toEqual(MathModeOptions.SUBTRACTION);
  });

  it("should handle reset when mathMode is set to SUBTRACTION", () => {
    let actual = gameReducer(initialState, setMathModeToSubtraction());
    actual = gameReducer(actual, reset());
    expect(actual.min).toEqual(INITIAL_SUBTRACTION_MIN);
    expect(actual.max).toEqual(INITIAL_SUBTRACTION_MAX);
    expect(actual.currentQuestion?.sign).toBe("-");
  });

  it("should handle setting the math mode to multiplication", () => {
    const actual = gameReducer(initialState, setMathModeToMultiplication());
    expect(actual.mathMode).toEqual(MathModeOptions.MULTIPLICATION);
  });

  it("should handle reset when mathMode is set to MULTIPLICATION", () => {
    let actual = gameReducer(initialState, setMathModeToMultiplication());
    actual = gameReducer(actual, reset());
    expect(actual.min).toEqual(INITIAL_MULTIPLICATION_MIN);
    expect(actual.max).toEqual(INITIAL_MULTIPLICATION_MAX);
    expect(actual.currentQuestion?.sign).toBe("x");
  });

  it("should handle settings the difficulty to easy", () => {
    const actual = gameReducer(initialState, setDifficultyToEasy());
    expect(actual.difficulty).toEqual(DifficultyOptions.EASY);
  });

  it("should handle settings the difficulty to normal", () => {
    const actual = gameReducer(initialState, setDifficultyToNormal());
    expect(actual.difficulty).toEqual(DifficultyOptions.NORMAL);
  });

  it("should handle settings the difficulty to hard", () => {
    const actual = gameReducer(initialState, setDifficultyToHard());
    expect(actual.difficulty).toEqual(DifficultyOptions.HARD);
  });

  it("should handle decrementing the game timer", () => {
    const actual = gameReducer(initialState, decrementGameTimer());
    expect(actual.gameTimer).toEqual(59);
  });

  it("should handle updating the user answer", () => {
    // updating user answer requires comparing it to the curentQuestion.answer
    // currentQuestion is undefined until after reset() is called
    let actual = gameReducer(initialState, reset());
    // the answer can never be `123456` at this point of the game
    actual = gameReducer(actual, updateUserAnswer("123456"));
    expect(actual.userAnswer).toEqual("123456");
  });

  it("should handle when the user enters the correct answer", () => {
    let actual = gameReducer(initialState, reset());
    const currentQuestion = actual.currentQuestion;
    const nextQuestion = actual.nextQuestions![0];
    const nextNextQuestion = actual.nextQuestions![1];
    const lastQuestion = actual.nextQuestions![2];
    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));
    // correct answer increments score by 1, increments timer by 1,
    // and clears userAnswer, then sets currentQuestion to the first
    // element of nextQuestions, shifts nextQuestions, and generates
    // a new question and appends it to the end of nextQuestions
    expect(actual.score).toEqual(1);
    expect(actual.gameTimer).toEqual(61);
    expect(actual.userAnswer).toEqual("");
    expect(actual.currentQuestion).not.toBe(currentQuestion);
    expect(actual.nextQuestions![0]).not.toBe(nextQuestion);
    expect(actual.nextQuestions![1]).not.toBe(nextNextQuestion);
    expect(actual.nextQuestions![2]).not.toBe(lastQuestion);
  });

  it("should handle incrementing min/max on EASY ADDITION", () => {
    let actual = gameReducer(initialState, setMathModeToAddition());
    actual = gameReducer(actual, setDifficultyToEasy());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < ADDITION_EASY_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_ADDITION_MIN);
    expect(actual.max).toEqual(INITIAL_ADDITION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_ADDITION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_ADDITION_MAX + 1);
  });

  it("should handle incrementing min/max on NORMAL ADDITION", () => {
    let actual = gameReducer(initialState, setMathModeToAddition());
    actual = gameReducer(actual, setDifficultyToNormal());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < ADDITION_NORMAL_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_ADDITION_MIN);
    expect(actual.max).toEqual(INITIAL_ADDITION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_ADDITION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_ADDITION_MAX + 1);
  });

  it("should handle incrementing min/max on HARD ADDITION", () => {
    let actual = gameReducer(initialState, setMathModeToAddition());
    actual = gameReducer(actual, setDifficultyToHard());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < ADDITION_HARD_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_ADDITION_MIN);
    expect(actual.max).toEqual(INITIAL_ADDITION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_ADDITION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_ADDITION_MAX + 1);
  });

  it("should handle incrementing min/max on EASY SUBTRACTION", () => {
    let actual = gameReducer(initialState, setMathModeToSubtraction());
    actual = gameReducer(actual, setDifficultyToEasy());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < SUBTRACTION_EASY_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_SUBTRACTION_MIN);
    expect(actual.max).toEqual(INITIAL_SUBTRACTION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_SUBTRACTION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_SUBTRACTION_MAX + 1);
  });

  it("should handle incrementing min/max on NORMAL SUBTRACTION", () => {
    let actual = gameReducer(initialState, setMathModeToSubtraction());
    actual = gameReducer(actual, setDifficultyToNormal());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < SUBTRACTION_NORMAL_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_SUBTRACTION_MIN);
    expect(actual.max).toEqual(INITIAL_SUBTRACTION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_SUBTRACTION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_SUBTRACTION_MAX + 1);
  });

  it("should handle incrementing min/max on HARD SUBTRACTION", () => {
    let actual = gameReducer(initialState, setMathModeToSubtraction());
    actual = gameReducer(actual, setDifficultyToHard());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < SUBTRACTION_HARD_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_SUBTRACTION_MIN);
    expect(actual.max).toEqual(INITIAL_SUBTRACTION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_SUBTRACTION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_SUBTRACTION_MAX + 1);
  });

  it("should handle incrementing min/max on EASY MULTIPLICATION", () => {
    let actual = gameReducer(initialState, setMathModeToMultiplication());
    actual = gameReducer(actual, setDifficultyToEasy());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < MULTIPLICATION_EASY_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_MULTIPLICATION_MIN);
    expect(actual.max).toEqual(INITIAL_MULTIPLICATION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_MULTIPLICATION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_MULTIPLICATION_MAX + 1);
  });

  it("should handle incrementing min/max on NORMAL MULTIPLICATION", () => {
    let actual = gameReducer(initialState, setMathModeToMultiplication());
    actual = gameReducer(actual, setDifficultyToNormal());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < MULTIPLICATION_NORMAL_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_MULTIPLICATION_MIN);
    expect(actual.max).toEqual(INITIAL_MULTIPLICATION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_MULTIPLICATION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_MULTIPLICATION_MAX + 1);
  });

  it("should handle incrementing min/max on HARD MULTIPLICATION", () => {
    let actual = gameReducer(initialState, setMathModeToMultiplication());
    actual = gameReducer(actual, setDifficultyToHard());
    actual = gameReducer(actual, reset());

    for (let i = 0; i < MULTIPLICATION_HARD_INCREMENT_INTERVAL - 1; i++) {
      const answer = actual.currentQuestion?.answer;
      actual = gameReducer(actual, updateUserAnswer(String(answer)));
    }

    expect(actual.min).toEqual(INITIAL_MULTIPLICATION_MIN);
    expect(actual.max).toEqual(INITIAL_MULTIPLICATION_MAX);

    const answer = actual.currentQuestion?.answer;
    actual = gameReducer(actual, updateUserAnswer(String(answer)));

    expect(actual.min).toEqual(INITIAL_MULTIPLICATION_MIN + 1);
    expect(actual.max).toEqual(INITIAL_MULTIPLICATION_MAX + 1);
  });
});
