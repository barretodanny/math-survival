import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UIModalState } from "../../constants/ui";
import {
  selectUIModal,
  showCountdownScreen,
  showHowToPlayModal,
  showScoresModal,
  showSettingsModal,
} from "../../features/ui/ui-slice";
import {
  selectDifficultyOption,
  selectMathModeOption,
  setDifficultyToEasy,
  setDifficultyToHard,
  setDifficultyToNormal,
  setMathModeToAddition,
  setMathModeToMultiplication,
  setMathModeToSubtraction,
} from "../../features/game/game-slice";

import ScoresModal from "../../components/Modal/ScoresModal";
import SettingsModal from "../../components/Modal/SettingsModal";
import HowToPlayModal from "../../components/Modal/HowToPlayModal";

function Setup() {
  const modal = useAppSelector(selectUIModal);
  const mathMode = useAppSelector(selectMathModeOption);
  const difficulty = useAppSelector(selectDifficultyOption);
  const dispatch = useAppDispatch();

  return (
    <div>
      {modal === UIModalState.SCORES && <ScoresModal />}
      {modal === UIModalState.SETTINGS && <SettingsModal />}
      {modal === UIModalState.HOW_TO_PLAY && <HowToPlayModal />}
      <h2>Setup</h2>
      <p>MathMode: {mathMode}</p>
      <p>Difficulty: {difficulty}</p>
      <div>
        <div>
          <button onClick={() => dispatch(setMathModeToAddition())}>
            Addition
          </button>
          <button onClick={() => dispatch(setMathModeToSubtraction())}>
            Subtraction
          </button>
          <button onClick={() => dispatch(setMathModeToMultiplication())}>
            Multiplication
          </button>
        </div>
        <br />
        <div>
          <button onClick={() => dispatch(setDifficultyToEasy())}>Easy</button>
          <button onClick={() => dispatch(setDifficultyToNormal())}>
            Normal
          </button>
          <button onClick={() => dispatch(setDifficultyToHard())}>Hard</button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <button onClick={() => dispatch(showHowToPlayModal())}>
        How To Play
      </button>
      <br />
      <button onClick={() => dispatch(showSettingsModal())}>Settings</button>
      <br />
      <button onClick={() => dispatch(showScoresModal())}>View Scores</button>
      <br />
      <button onClick={() => dispatch(showCountdownScreen())}>Start</button>
    </div>
  );
}

export default Setup;
