import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decrementCountdownTimer,
  incrementCountdownTimer,
  selectAutoSaveSetting,
  selectCountdownTimer,
  selectDarkModeSetting,
  selectDefaultUsername,
  setDefaultUsername,
  toggleAutoSave,
  toggleDarkMode,
} from "../../features/settings/settings-slice";
import Modal from "./Modal";

function SettingsModal() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);
  const defaultUsername = useAppSelector(selectDefaultUsername);
  const autoSave = useAppSelector(selectAutoSaveSetting);
  const countdownTimer = useAppSelector(selectCountdownTimer);

  return (
    <Modal>
      <span>Settings</span>
      <div>
        <p>Darkmode: {darkMode ? "On" : "Off"}</p>
        <button onClick={() => dispatch(toggleDarkMode())}>
          Toggle Darkmode
        </button>
      </div>
      <div>
        <p>Default Username:</p>
        <input
          type="text"
          value={defaultUsername}
          onChange={(e) => dispatch(setDefaultUsername(e.target.value))}
        />
      </div>
      <div>
        <p>Auto Save: {autoSave ? "On" : "Off"}</p>
        <button onClick={() => dispatch(toggleAutoSave())}>
          Toggle Autosave
        </button>
      </div>
      <div>
        <p>Countdown Timer:</p>
        <span>
          <button onClick={() => dispatch(incrementCountdownTimer())}>+</button>{" "}
          {countdownTimer}{" "}
          <button onClick={() => dispatch(decrementCountdownTimer())}>-</button>
        </span>
      </div>
    </Modal>
  );
}

export default SettingsModal;
