import { useAppDispatch } from "../../app/hooks";
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

  return (
    <div className={styles.container}>
      <span>Timer: {timer}</span>
      <span>Score: {score}</span>
      <span>Min: {min}</span>
      <span>Max: {max}</span>
      <button
        className={styles.quitBtn}
        onClick={() => dispatch(showSetupScreen())}
      >
        Quit
      </button>
    </div>
  );
}

export default GameInfoBar;
