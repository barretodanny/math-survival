import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectGameScore } from "../../features/game/game-slice";
import {
  selectAutoSaveSetting,
  selectDefaultUsername,
} from "../../features/settings/settings-slice";
import { showSetupScreen } from "../../features/ui/ui-slice";

function PostGame() {
  const dispatch = useAppDispatch();
  const score = useAppSelector(selectGameScore);
  const autoSave = useAppSelector(selectAutoSaveSetting);
  const defaultUsername = useAppSelector(selectDefaultUsername);
  const [username, setUsername] = useState(defaultUsername);
  const [saved, setSaved] = useState(false);

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
              <button
                onClick={() => {
                  console.log(
                    `Saving score of ${score} under username ${username}`
                  );
                  setSaved(true);
                }}
              >
                Save
              </button>
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
