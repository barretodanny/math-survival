import { useAppDispatch } from "../../app/hooks";
import {
  showPostGameScreen,
  showSetupScreen,
} from "../../features/ui/ui-slice";

function Game() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Game</h2>
      <button onClick={() => dispatch(showSetupScreen())}>Quit</button>
      <br />
      <button onClick={() => dispatch(showPostGameScreen())}>Next</button>
    </div>
  );
}

export default Game;
