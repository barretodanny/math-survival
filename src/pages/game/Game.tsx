import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decrementGameTimer,
  selectGameCurrentQuestion,
  selectGameMax,
  selectGameMin,
  selectGameNextQuestions,
  selectGamePreviousQuestion,
  selectGameScore,
  selectGameTimer,
  selectGameUserAnswer,
  updateUserAnswer,
} from "../../features/game/game-slice";
import {
  showPostGameScreen,
  showSetupScreen,
} from "../../features/ui/ui-slice";

function Game() {
  const dispatch = useAppDispatch();
  const timer = useAppSelector(selectGameTimer);
  const score = useAppSelector(selectGameScore);
  const min = useAppSelector(selectGameMin);
  const max = useAppSelector(selectGameMax);
  const previousQuestion = useAppSelector(selectGamePreviousQuestion);
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
    <div>
      <h2>Game</h2>
      <h4>Timer: {timer}</h4>
      <h4>Score: {score}</h4>
      <h4>Min: {min}</h4>
      <h4>Max: {max}</h4>
      <div>
        <h5>Prev Question</h5>
        <span>
          {previousQuestion?.n1} {previousQuestion?.sign} {previousQuestion?.n2}
        </span>
      </div>
      <div>
        <h5>Current Question</h5>
        <span>
          {currentQuestion?.n1} {currentQuestion?.sign} {currentQuestion?.n2}
        </span>
        <input
          type="text"
          value={userAnswer ? userAnswer : ""}
          onChange={(e) => dispatch(updateUserAnswer(e.target.value))}
        />
      </div>
      <div>
        <h5>Next Question</h5>
        <span>
          {nextQuestions![0].n1} {nextQuestions![0].sign} {nextQuestions![0].n2}
        </span>
      </div>
      <div>
        <h5>Next Next Question</h5>
        <span>
          {nextQuestions![1].n1} {nextQuestions![1].sign} {nextQuestions![1].n2}
        </span>
      </div>
      <div>
        <h5>Next Next Next Question</h5>
        <span>
          {nextQuestions![2].n1} {nextQuestions![2].sign} {nextQuestions![2].n2}
        </span>
      </div>
      <button onClick={() => dispatch(showSetupScreen())}>Quit</button>
      <br />
      <button onClick={() => dispatch(showPostGameScreen())}>Next</button>
    </div>
  );
}

export default Game;
