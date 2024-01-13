import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";
import { showSetupScreen } from "../../features/ui/ui-slice";

import styles from "./GameInfoBar.module.css";

interface GameInfoBarProps {
  timer: number;
  score: number;
  min: number;
  max: number;
}

function GameInfoBar({ timer, score, min, max }: GameInfoBarProps) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);

  return (
    <div
      className={`${styles.container} ${
        darkMode ? `${styles.containerDark}` : `${styles.containerLight}`
      }`}
    >
      <span>Timer: {timer}</span>
      <span>Score: {score}</span>
      <span>Min: {min}</span>
      <span>Max: {max}</span>
      <button
        className={`${styles.quitBtn} ${
          darkMode ? `${styles.quitBtnDark}` : `${styles.quitBtnLight}`
        }`}
        onClick={() => dispatch(showSetupScreen())}
      >
        Quit
      </button>
    </div>
  );
}

export default GameInfoBar;
