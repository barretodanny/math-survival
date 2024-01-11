import Modal from "./Modal";

function HowToPlayModal() {
  return (
    <Modal>
      <p>
        You start with 60 seconds, and each question you answer will add an
        additional second to the timer. The game ends when you run out of time.
      </p>
      <p>
        Math mode allows you to choose what kind of math questions you will
        receive
      </p>
      <p>
        The questions you receive will be within a range, with a minimum value
        and a maximum value.
      </p>
      <p>
        This value depends on both the math mode and the difficulty you choose.
      </p>
      <p>
        In Addition, the initial minimum will be (0?) and the maximum will be
        (20?). As you answer more questions, these will raise depending on the
        difficulty. In Easy mode, they will increment every (10?) questions, in
        Normal they will increment every (7?) questions and in Hard they will
        increment every (4?) questions.
      </p>
      <p>
        In Subtraction, the initial minimum will be (0?) and the maximum will be
        (15?). It will increase every (14?) questions on Easy, (10?) questions
        on Normal, and (6?) questions on hard.
      </p>
      <p>
        In Muliplication, the initial minimum will be (0?) and the maximum will
        be (5?). It will increase every (20?) questions on Easy, (17?) questions
        on Normal, and (14) questions on hard.
      </p>
    </Modal>
  );
}

export default HowToPlayModal;
