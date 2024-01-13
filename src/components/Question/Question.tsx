import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUserAnswer } from "../../features/game/game-slice";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";
import { QuestionType } from "../../types/game";

import styles from "./Question.module.css";

interface QuestionProps {
  question: QuestionType | undefined;
  current?: boolean;
  userAnswer?: string;
}

function Question({ question, current, userAnswer }: QuestionProps) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);

  return (
    <div
      className={`${styles.container} ${
        current
          ? darkMode
            ? `${styles.currentQuestionDark}`
            : `${styles.currentQuestionLight}`
          : darkMode
          ? `${styles.questionDark}`
          : `${styles.questionLight}`
      }`}
    >
      <span className={styles.question}>
        {question?.n1} {question?.sign} {question?.n2}
      </span>
      {current && (
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => dispatch(updateUserAnswer(e.target.value))}
          autoFocus
          className={`${styles.answerInput} ${
            darkMode
              ? `${styles.answerInputDark}`
              : `${styles.answerInputLight}`
          }`}
        />
      )}
    </div>
  );
}

export default Question;
