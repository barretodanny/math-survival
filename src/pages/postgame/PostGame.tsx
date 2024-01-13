import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDifficultyOption,
  selectGameScore,
  selectMathModeOption,
} from "../../features/game/game-slice";
import {
  selectAutoSaveSetting,
  selectDarkModeSetting,
  selectDefaultUsername,
} from "../../features/settings/settings-slice";
import { showSetupScreen } from "../../features/ui/ui-slice";
import { generateGameString } from "../../utils/scores";

import styles from "./PostGame.module.css";

function PostGame() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);
  const difficulty = useAppSelector(selectDifficultyOption);
  const mathMode = useAppSelector(selectMathModeOption);
  const score = useAppSelector(selectGameScore);
  const autoSave = useAppSelector(selectAutoSaveSetting);
  const defaultUsername = useAppSelector(selectDefaultUsername);
  const [username, setUsername] = useState(defaultUsername);
  const [saved, setSaved] = useState(false);

  function saveScore() {
    const gameString = generateGameString(mathMode, difficulty);
    const date = new Date().toISOString();
    const scoreString = `${username}_${score}_${date}`;
    const savedScores = localStorage.getItem(gameString);

    savedScores
      ? localStorage.setItem(gameString, `${savedScores},${scoreString}`)
      : localStorage.setItem(gameString, `${scoreString}`);

    setSaved(true);
  }

  useEffect(() => {
    if (autoSave) {
      saveScore();
    }
  }, [autoSave]);

  return (
    <div
      className={`${styles.container} ${
        darkMode ? `${styles.containerDark}` : `${styles.containerLight}`
      }`}
    >
      <h4 className={`${styles.heading} ${styles.center}`}>
        You survived {score + 60} seconds
      </h4>
      <h4 className={`${styles.heading2} ${styles.center}`}>
        Final score: {score}
      </h4>
      {autoSave ? (
        <div>
          {/* TODO implement auto save */}
          <p className={styles.center}>
            Score has been automatically saved under username{" "}
            <strong>{defaultUsername}</strong>
          </p>
          <p className={styles.center}>You can change this in the settings.</p>
        </div>
      ) : (
        <>
          {saved ? (
            <p className={styles.center}>Score saved</p>
          ) : (
            <div className={styles.saveContainer}>
              <p className={styles.center}>
                Would you like to save this score?
              </p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`${styles.usernameTextInput} ${
                  darkMode ? `${styles.usernameTextInputDark}` : ""
                }`}
              />
              <button
                onClick={saveScore}
                className={`${styles.saveBtn} ${
                  darkMode ? `${styles.saveBtnDark}` : `${styles.saveBtnLight}`
                }`}
              >
                Save
              </button>
            </div>
          )}
        </>
      )}
      <br />
      <button
        onClick={() => dispatch(showSetupScreen())}
        className={`${styles.playBtn} ${
          darkMode ? `${styles.playBtnDark}` : `${styles.playBtnLight}`
        }`}
      >
        Play Again
      </button>
    </div>
  );
}

export default PostGame;
