import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectDifficultyOption,
  selectMathModeOption,
} from "../../features/game/game-slice";
import Modal from "./Modal";
import { DifficultyOptions, MathModeOptions } from "../../constants/game";
import { generateGameString, parseScores } from "../../utils/scores";
import { Score } from "../../types/scores";

function ScoresModal() {
  const initialMathMode = useAppSelector(selectMathModeOption);
  const initialDifficulty = useAppSelector(selectDifficultyOption);
  const [mathMode, setMathMode] = useState(initialMathMode);
  const [difficulty, setDifficulty] = useState(initialDifficulty);

  const gameString = generateGameString(mathMode, difficulty);
  const scoresString = localStorage.getItem(gameString) || "";
  const scores: Score[] = parseScores(scoresString);
  console.log(scores);

  return (
    <Modal>
      <span>Scores</span>
      <p>Game string: {gameString}</p>
      <div>
        <button onClick={() => setMathMode(MathModeOptions.ADDITION)}>
          Addition
        </button>
        <button onClick={() => setMathMode(MathModeOptions.SUBTRACTION)}>
          Subtraction
        </button>
        <button onClick={() => setMathMode(MathModeOptions.MULTIPLICATION)}>
          Multiplication
        </button>
      </div>
      <br />
      <div>
        <button onClick={() => setDifficulty(DifficultyOptions.EASY)}>
          Easy
        </button>
        <button onClick={() => setDifficulty(DifficultyOptions.NORMAL)}>
          Normal
        </button>
        <button onClick={() => setDifficulty(DifficultyOptions.HARD)}>
          Hard
        </button>
      </div>
      <p>{mathMode}</p>
      <p>{difficulty}</p>

      {scores.length > 0 ? (
        <>
          <h4>List of scores:</h4>
          {scores.map((score, index) => {
            return (
              <div key={index}>
                <span>
                  username: {score.username} - score: {score.score} - date:{" "}
                  {score.date}
                </span>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <p>No scores found</p>
        </>
      )}
    </Modal>
  );
}

export default ScoresModal;
