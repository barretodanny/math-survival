import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UIModalState } from "../../constants/ui";
import { DifficultyOptions, MathModeOptions } from "../../constants/game";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";
import {
  selectUIModal,
  showCountdownScreen,
  showHowToPlayModal,
  showScoresModal,
  showSettingsModal,
} from "../../features/ui/ui-slice";
import {
  selectDifficultyOption,
  selectMathModeOption,
  setDifficultyToEasy,
  setDifficultyToHard,
  setDifficultyToNormal,
  setMathModeToAddition,
  setMathModeToMultiplication,
  setMathModeToSubtraction,
} from "../../features/game/game-slice";

import ScoresModal from "../../components/Modal/ScoresModal";
import SettingsModal from "../../components/Modal/SettingsModal";
import HowToPlayModal from "../../components/Modal/HowToPlayModal";

import styles from "./Setup.module.css";

function Setup() {
  const darkMode = useAppSelector(selectDarkModeSetting);
  const modal = useAppSelector(selectUIModal);
  const mathMode = useAppSelector(selectMathModeOption);
  const difficulty = useAppSelector(selectDifficultyOption);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      {modal === UIModalState.SCORES && <ScoresModal />}
      {modal === UIModalState.SETTINGS && <SettingsModal />}
      {modal === UIModalState.HOW_TO_PLAY && <HowToPlayModal />}
      <div className={styles.sectionContainer}>
        <h3
          className={`${styles.heading} ${
            darkMode ? `${styles.darkText}` : `${styles.lightText}`
          }`}
        >
          Choose Math Mode
        </h3>
        <button
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
          onClick={() => dispatch(setMathModeToAddition())}
        >
          Addition
        </button>
        <button
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
          onClick={() => dispatch(setMathModeToSubtraction())}
        >
          Subtraction
        </button>
        <button
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
          onClick={() => dispatch(setMathModeToMultiplication())}
        >
          Multiplication
        </button>
      </div>
      <div className={styles.sectionContainer}>
        <h3
          className={`${styles.heading} ${
            darkMode ? `${styles.darkText}` : `${styles.lightText}`
          }`}
        >
          Choose Difficulty
        </h3>
        <button
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
          onClick={() => dispatch(setDifficultyToEasy())}
        >
          Easy
        </button>
        <button
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
          onClick={() => dispatch(setDifficultyToNormal())}
        >
          Normal
        </button>
        <button
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
          onClick={() => dispatch(setDifficultyToHard())}
        >
          Hard
        </button>
      </div>
      <div className={`${styles.sectionContainer} ${styles.bottom}`}>
        <button
          className={`${styles.btn} ${
            darkMode ? `${styles.HTPDark}` : `${styles.HTPLight}`
          }`}
          onClick={() => dispatch(showHowToPlayModal())}
        >
          How To Play
        </button>
        <button
          className={`${styles.btn} ${
            darkMode ? `${styles.settingsDark}` : `${styles.settingsLight}`
          }`}
          onClick={() => dispatch(showSettingsModal())}
        >
          Settings
        </button>
        <button
          className={`${styles.btn} ${
            darkMode ? `${styles.scoresDark}` : `${styles.scoresLight}`
          }`}
          onClick={() => dispatch(showScoresModal())}
        >
          View Scores
        </button>
        <button
          className={`${styles.btn} ${
            darkMode ? `${styles.startDark}` : `${styles.startLight}`
          }`}
          onClick={() => dispatch(showCountdownScreen())}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default Setup;
