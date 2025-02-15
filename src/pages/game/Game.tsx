import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showPostGameScreen } from "../../features/ui/ui-slice";
import {
  selectDarkModeSetting,
  selectFlashEnabledSetting,
} from "../../features/settings/settings-slice";
import {
  decrementGameTimer,
  selectGameCurrentQuestion,
  selectGameMax,
  selectGameMin,
  selectGameNextQuestions,
  selectGameScore,
  selectGameTimer,
  selectGameUserAnswer,
} from "../../features/game/game-slice";

import GameInfoBar from "../../components/GameInfoBar/GameInfoBar";
import QuestionsSlider from "../../components/QuestionsSlider/QuestionsSlider";

import styles from "./Game.module.css";

function Game() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);
  const timer = useAppSelector(selectGameTimer);
  const score = useAppSelector(selectGameScore);
  const min = useAppSelector(selectGameMin);
  const max = useAppSelector(selectGameMax);
  const currentQuestion = useAppSelector(selectGameCurrentQuestion);
  const userAnswer = useAppSelector(selectGameUserAnswer);
  const nextQuestions = useAppSelector(selectGameNextQuestions);
  const flashEnabled = useAppSelector(selectFlashEnabledSetting);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // count down timer every second
    const itv = setInterval(() => {
      dispatch(decrementGameTimer());
    }, 1000);

    return () => {
      clearInterval(itv);
    };
  }, []);

  useEffect(() => {
    // game ends when timer reaches 0
    if (timer <= 0) {
      dispatch(showPostGameScreen());
    }
  }, [timer]);

  useEffect(() => {
    if (score === 0) {
      return;
    }

    // screen flashes green every time a question is answered correctly for 450ms
    setFlash(flashEnabled && true);

    const timeoutId = setTimeout(() => {
      setFlash(false);
    }, 450);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [score]);

  return (
    <div
      className={`${styles.container} ${
        darkMode ? `${styles.containerDark}` : `${styles.containerLight}`
      } ${flash ? `${styles.flash}` : ""}`}
    >
      <GameInfoBar timer={timer} score={score} min={min} max={max} />
      <QuestionsSlider
        currentQuestion={currentQuestion}
        nextQuestions={nextQuestions}
        userAnswer={userAnswer}
      />
    </div>
  );
}

export default Game;
