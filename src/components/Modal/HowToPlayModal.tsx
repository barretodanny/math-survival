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

function HowToPlayModal() {
  return (
    <Modal>
      <p>
        You start with 60 seconds, and each question you answer will add an
        additional second to the timer. The game ends when you run out of time.
      </p>
      <p style={{ margin: 0 }}>
        <strong>Addition</strong>
        <p style={{ marginTop: 8, marginBottom: 2 }}>
          The operands initially fall in a range from {INITIAL_ADDITION_MIN} to{" "}
          {INITIAL_ADDITION_MAX}. Ex: 5 + 7. The minimum and maximum values will
          increase as you answer more questions based on the difficulty
          selected.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Easy:</strong> every{" "}
          <strong>{ADDITION_EASY_INCREMENT_INTERVAL}</strong> questions.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Normal:</strong> every{" "}
          <strong>{ADDITION_NORMAL_INCREMENT_INTERVAL}</strong> questions.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Hard:</strong> every{" "}
          <strong>{ADDITION_HARD_INCREMENT_INTERVAL}</strong> questions.
        </p>
      </p>
      <p style={{ margin: 0 }}>
        <strong>Subtraction</strong>
        <p style={{ marginTop: 8, marginBottom: 2 }}>
          The operands initially fall in a range from {INITIAL_SUBTRACTION_MIN}{" "}
          to {INITIAL_SUBTRACTION_MAX}. Ex: 8 - 4. The minimum and maximum
          values will increase as you answer more questions based on the
          difficulty selected.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Easy:</strong> every{" "}
          <strong>{SUBTRACTION_EASY_INCREMENT_INTERVAL}</strong> questions.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Normal:</strong> every{" "}
          <strong>{SUBTRACTION_NORMAL_INCREMENT_INTERVAL}</strong> questions.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Hard:</strong> every{" "}
          <strong>{SUBTRACTION_HARD_INCREMENT_INTERVAL}</strong> questions.
        </p>
      </p>
      <p style={{ margin: 0 }}>
        <strong>Multiplication</strong>
        <p style={{ marginTop: 8, marginBottom: 2 }}>
          The operands initially fall in a range from{" "}
          {INITIAL_MULTIPLICATION_MIN} to {INITIAL_MULTIPLICATION_MAX}. Ex: 2 x
          4. The minimum and maximum values will increase as you answer more
          questions based on the difficulty selected.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Easy:</strong> every{" "}
          <strong>{MULTIPLICATION_EASY_INCREMENT_INTERVAL}</strong> questions.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Normal:</strong> every{" "}
          <strong>{MULTIPLICATION_NORMAL_INCREMENT_INTERVAL}</strong> questions.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Hard:</strong> every{" "}
          <strong>{MULTIPLICATION_HARD_INCREMENT_INTERVAL}</strong> questions.
        </p>
      </p>
    </Modal>
  );
}

export default HowToPlayModal;
