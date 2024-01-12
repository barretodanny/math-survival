import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCountdownTimer,
  selectDarkModeSetting,
} from "../../features/settings/settings-slice";
import { showGameScreen } from "../../features/ui/ui-slice";
import { reset } from "../../features/game/game-slice";

import styles from "./Countdown.module.css";

function Countdown() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);
  const countdownTimer = useAppSelector(selectCountdownTimer);
  const [timer, setTimer] = useState(countdownTimer);

  useEffect(() => {
    // reset game state
    dispatch(reset());

    const itv = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(itv);
    };
  }, []);

  useEffect(() => {
    // dispatched after 'GO!' is displayed
    if (timer < 0) {
      dispatch(showGameScreen());
    }
  }, [timer]);

  return (
    <div className={styles.container}>
      <h3
        className={`${styles.heading} ${
          darkMode ? styles.textDark : styles.textLight
        }`}
      >
        Starting in...
      </h3>
      <h3
        className={`${styles.count} ${
          darkMode ? styles.textDark : styles.textLight
        }`}
      >
        {timer === 0 ? "GO!" : timer}
      </h3>
    </div>
  );
}

export default Countdown;
