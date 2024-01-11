import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDifficultyOption,
  selectGameScore,
  selectMathModeOption,
} from "../../features/game/game-slice";
import {
  selectAutoSaveSetting,
  selectDefaultUsername,
} from "../../features/settings/settings-slice";
import { showSetupScreen } from "../../features/ui/ui-slice";
import { generateGameString } from "../../utils/scores";

function PostGame() {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector(selectDifficultyOption);
  const mathMode = useAppSelector(selectMathModeOption);
  const score = useAppSelector(selectGameScore);
  const autoSave = useAppSelector(selectAutoSaveSetting);
  const defaultUsername = useAppSelector(selectDefaultUsername);
  const [username, setUsername] = useState(defaultUsername);
  const [saved, setSaved] = useState(false);

  function saveScore() {
    const gameString = generateGameString(mathMode, difficulty);
    const date = new Date().toISOString();
    const scoreString = `${username}_${score}_${date}`;
    const savedScores = localStorage.getItem(gameString);

    savedScores
      ? localStorage.setItem(gameString, `${savedScores},${scoreString}`)
      : localStorage.setItem(gameString, `${scoreString}`);

    setSaved(true);
  }

  useEffect(() => {
    if (autoSave) {
      saveScore();
    }
  }, [autoSave]);

  return (
    <div>
      <h2>PostGame</h2>
      <h4>You survived {score + 60} seconds</h4>
      <h4>Final score: {score}</h4>
      {autoSave ? (
        <>
          {/* TODO implement auto save */}
          <p>
            Score has been automatically saved under username {defaultUsername}
          </p>
          <p>You can change this in the settings.</p>
        </>
      ) : (
        <>
          {saved ? (
            <>
              <p>Score saved</p>
            </>
          ) : (
            <>
              <p>Would you like to save this score?</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <button onClick={saveScore}>Save</button>
            </>
          )}
        </>
      )}
      <br />
      <button onClick={() => dispatch(showSetupScreen())}>Play Again</button>
    </div>
  );
}

export default PostGame;
