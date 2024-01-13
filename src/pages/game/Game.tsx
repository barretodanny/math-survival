import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import { showPostGameScreen } from "../../features/ui/ui-slice";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";

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

  useEffect(() => {
    const itv = setInterval(() => {
      dispatch(decrementGameTimer());
    }, 1000);

    return () => {
      clearInterval(itv);
    };
  }, []);

  useEffect(() => {
    console.log(timer);
    if (timer <= 0) {
      dispatch(showPostGameScreen());
    }
  }, [timer]);

  return (
    <div
      className={`${styles.container} ${
        darkMode ? `${styles.containerDark}` : `${styles.containerLight}`
      }`}
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
