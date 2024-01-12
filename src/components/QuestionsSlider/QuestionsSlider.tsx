import { useAppSelector } from "../../app/hooks";
import { selectGameScore } from "../../features/game/game-slice";
import { QuestionType } from "../../types/game";

import Question from "../Question/Question";

import styles from "./QuestionsSlider.module.css";

interface QuestionsSliderProps {
  currentQuestion: QuestionType | undefined;
  nextQuestions: [QuestionType, QuestionType, QuestionType] | undefined;
  userAnswer: string | undefined;
}

function QuestionsSlider({
  currentQuestion,
  nextQuestions,
  userAnswer,
}: QuestionsSliderProps) {
  const score = useAppSelector(selectGameScore);

  return (
    <div className={styles.container}>
      <Question
        key={score}
        question={currentQuestion}
        current={true}
        userAnswer={userAnswer}
      />
      <Question key={score + 1} question={nextQuestions![0]} />
      <Question key={score + 2} question={nextQuestions![1]} />
      <Question key={score + 3} question={nextQuestions![2]} />
    </div>
  );
}

export default QuestionsSlider;
