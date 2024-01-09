import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCountdownTimer } from "../../features/settings/settings-slice";
import { showGameScreen } from "../../features/ui/ui-slice";

function Countdown() {
  const dispatch = useAppDispatch();
  const countdownTimer = useAppSelector(selectCountdownTimer);
  const [timer, setTimer] = useState(countdownTimer);

  useEffect(() => {
    const itv = setInterval(() => {
      setTimer((prev) => prev - 1);

      // dispatched after 'GO!' is displayed
      if (timer <= 0) {
        dispatch(showGameScreen());
      }
    }, 1000);

    return () => {
      clearInterval(itv);
    };
  }, [timer]);

  return (
    <div>
      <h2>Countdown</h2>
      <h4>{timer === 0 ? "GO!" : timer}</h4>
      <button onClick={() => dispatch(showGameScreen())}>Next</button>
    </div>
  );
}

export default Countdown;
