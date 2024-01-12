import {
  ADDITION_EASY_INCREMENT_INTERVAL,
  ADDITION_HARD_INCREMENT_INTERVAL,
  ADDITION_NORMAL_INCREMENT_INTERVAL,
  INITIAL_ADDITION_MAX,
  INITIAL_ADDITION_MIN,
  INITIAL_MULTIPLICATION_MAX,
  INITIAL_MULTIPLICATION_MIN,
  INITIAL_SUBTRACTION_MAX,
  INITIAL_SUBTRACTION_MIN,
  MULTIPLICATION_EASY_INCREMENT_INTERVAL,
  MULTIPLICATION_HARD_INCREMENT_INTERVAL,
  MULTIPLICATION_NORMAL_INCREMENT_INTERVAL,
  SUBTRACTION_EASY_INCREMENT_INTERVAL,
  SUBTRACTION_HARD_INCREMENT_INTERVAL,
  SUBTRACTION_NORMAL_INCREMENT_INTERVAL,
} from "../../constants/game";

import Modal from "./Modal";

import styles from "./Modal.module.css";

function HowToPlayModal() {
  return (
    <Modal>
      <div className={styles.content}>
        <p className={`${styles.text} ${styles.centerText}`}>
          You start with 60 seconds, and each question you answer will add an
          additional second to the timer. The game ends when you run out of
          time.
        </p>
        <div>
          <p
            className={`${styles.text} ${styles.centerText} ${styles.sectionHeading}`}
          >
            Addition
          </p>
          <p className={`${styles.text} ${styles.centerText}`}>
            The operands initially fall in a range from{" "}
            <strong>{INITIAL_ADDITION_MIN}</strong> to{" "}
            <strong>{INITIAL_ADDITION_MAX}</strong>. <strong>Ex: 5 + 7</strong>.
            The minimum and maximum values will increase as you answer more
            questions based on the difficulty selected.
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Easy</strong>: every{" "}
            <strong>{ADDITION_EASY_INCREMENT_INTERVAL}</strong> questions
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Normal</strong>: every{" "}
            <strong>{ADDITION_NORMAL_INCREMENT_INTERVAL}</strong> questions
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Hard</strong>: every{" "}
            <strong>{ADDITION_HARD_INCREMENT_INTERVAL}</strong> questions
          </p>
        </div>
        <div>
          <p
            className={`${styles.text} ${styles.centerText} ${styles.sectionHeading}`}
          >
            Subtraction
          </p>
          <p className={`${styles.text} ${styles.centerText}`}>
            The operands initially fall in a range from{" "}
            <strong>{INITIAL_SUBTRACTION_MIN}</strong> to{" "}
            <strong>{INITIAL_SUBTRACTION_MAX}</strong>.{" "}
            <strong>Ex: 8 - 4</strong>. The minimum and maximum values will
            increase as you answer more questions based on the difficulty
            selected.
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Easy</strong>: every{" "}
            <strong>{SUBTRACTION_EASY_INCREMENT_INTERVAL}</strong> questions
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Normal</strong>: every{" "}
            <strong>{SUBTRACTION_NORMAL_INCREMENT_INTERVAL}</strong> questions
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Hard</strong>: every{" "}
            <strong>{SUBTRACTION_HARD_INCREMENT_INTERVAL}</strong> questions
          </p>
        </div>
        <div>
          <p
            className={`${styles.text} ${styles.centerText} ${styles.sectionHeading}`}
          >
            Multiplication
          </p>
          <p className={`${styles.text} ${styles.centerText}`}>
            The operands initially fall in a range from{" "}
            <strong>{INITIAL_MULTIPLICATION_MIN}</strong> to{" "}
            <strong>{INITIAL_MULTIPLICATION_MAX}</strong>.{" "}
            <strong>Ex: 2 x 4</strong>. The minimum and maximum values will
            increase as you answer more questions based on the difficulty
            selected.
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Easy</strong>: every{" "}
            <strong>{MULTIPLICATION_EASY_INCREMENT_INTERVAL}</strong> questions
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Normal</strong>: every{" "}
            <strong>{MULTIPLICATION_NORMAL_INCREMENT_INTERVAL}</strong>{" "}
            questions
          </p>
          <p className={`${styles.text} ${styles.point}`}>
            <strong>Hard</strong>: every{" "}
            <strong>{MULTIPLICATION_HARD_INCREMENT_INTERVAL}</strong> questions
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default HowToPlayModal;
