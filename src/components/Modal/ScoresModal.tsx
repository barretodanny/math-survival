import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { generateGameString, parseScores } from "../../utils/scores";
import { DifficultyOptions, MathModeOptions } from "../../constants/game";
import { Score } from "../../types/scores";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";
import {
  selectDifficultyOption,
  selectMathModeOption,
} from "../../features/game/game-slice";

import Modal from "./Modal";
import ScoresTable from "../ScoresTable/ScoresTable";

import styles from "./Modal.module.css";

function ScoresModal() {
  const darkMode = useAppSelector(selectDarkModeSetting);
  const initialMathMode = useAppSelector(selectMathModeOption);
  const initialDifficulty = useAppSelector(selectDifficultyOption);
  const [mathMode, setMathMode] = useState(initialMathMode);
  const [difficulty, setDifficulty] = useState(initialDifficulty);

  const gameString = generateGameString(mathMode, difficulty);
  const scoresString = localStorage.getItem(gameString) || "";
  const scores: Score[] = parseScores(scoresString);

  return (
    <Modal>
      <div className={styles.content}>
        <h3 className={`${styles.scoresModalHeading} ${styles.centerText}`}>
          Scores
        </h3>
        <div className={styles.scoresSection}>
          <h4 className={`${styles.sectionHeading} ${styles.centerText}`}>
            Math Mode
          </h4>
          <div className={styles.btnContainer}>
            <button
              onClick={() => setMathMode(MathModeOptions.ADDITION)}
              className={`${styles.btn} 
            ${
              mathMode === MathModeOptions.ADDITION
                ? darkMode
                  ? `${styles.selectedBtnDark}`
                  : `${styles.selectedBtnLight}`
                : darkMode
                ? `${styles.btnDark}`
                : `${styles.btnLight}`
            }`}
            >
              Addition
            </button>
            <button
              onClick={() => setMathMode(MathModeOptions.SUBTRACTION)}
              className={`${styles.btn} 
            ${
              mathMode === MathModeOptions.SUBTRACTION
                ? darkMode
                  ? `${styles.selectedBtnDark}`
                  : `${styles.selectedBtnLight}`
                : darkMode
                ? `${styles.btnDark}`
                : `${styles.btnLight}`
            }`}
            >
              Subtraction
            </button>
            <button
              onClick={() => setMathMode(MathModeOptions.MULTIPLICATION)}
              className={`${styles.btn} 
            ${
              mathMode === MathModeOptions.MULTIPLICATION
                ? darkMode
                  ? `${styles.selectedBtnDark}`
                  : `${styles.selectedBtnLight}`
                : darkMode
                ? `${styles.btnDark}`
                : `${styles.btnLight}`
            }`}
            >
              Multiplication
            </button>
          </div>
        </div>
        <div className={styles.scoresSection}>
          <h4 className={`${styles.sectionHeading} ${styles.centerText}`}>
            Difficulty
          </h4>
          <div className={styles.btnContainer}>
            <button
              onClick={() => setDifficulty(DifficultyOptions.EASY)}
              className={`${styles.btn} 
            ${
              difficulty === DifficultyOptions.EASY
                ? darkMode
                  ? `${styles.selectedBtnDark}`
                  : `${styles.selectedBtnLight}`
                : darkMode
                ? `${styles.btnDark}`
                : `${styles.btnLight}`
            }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty(DifficultyOptions.NORMAL)}
              className={`${styles.btn} 
            ${
              difficulty === DifficultyOptions.NORMAL
                ? darkMode
                  ? `${styles.selectedBtnDark}`
                  : `${styles.selectedBtnLight}`
                : darkMode
                ? `${styles.btnDark}`
                : `${styles.btnLight}`
            }`}
            >
              Normal
            </button>
            <button
              onClick={() => setDifficulty(DifficultyOptions.HARD)}
              className={`${styles.btn} 
            ${
              difficulty === DifficultyOptions.HARD
                ? darkMode
                  ? `${styles.selectedBtnDark}`
                  : `${styles.selectedBtnLight}`
                : darkMode
                ? `${styles.btnDark}`
                : `${styles.btnLight}`
            }`}
            >
              Hard
            </button>
          </div>
        </div>

        <ScoresTable fetchedScores={scores} />
      </div>
    </Modal>
  );
}

export default ScoresModal;
