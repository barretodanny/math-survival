import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decrementCountdownTimer,
  incrementCountdownTimer,
  selectAutoSaveSetting,
  selectCountdownTimer,
  selectDarkModeSetting,
  selectDefaultUsername,
  selectFlashEnabledSetting,
  setDefaultUsername,
  toggleAutoSave,
  toggleDarkMode,
  toggleFlash,
} from "../../features/settings/settings-slice";

import Modal from "./Modal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import styles from "./Modal.module.css";

function SettingsModal() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);
  const defaultUsername = useAppSelector(selectDefaultUsername);
  const autoSave = useAppSelector(selectAutoSaveSetting);
  const countdownTimer = useAppSelector(selectCountdownTimer);
  const flashEnabled = useAppSelector(selectFlashEnabledSetting);

  return (
    <Modal>
      <div className={styles.content}>
        <h3 className={`${styles.modalHeading} ${styles.centerText}`}>
          Settings
        </h3>
        <div className={styles.settingOption}>
          <p>Dark mode</p>
          <ToggleSwitch
            on={darkMode}
            toggle={() => dispatch(toggleDarkMode())}
          />
        </div>
        <div className={styles.settingOption}>
          <p>Background Flash</p>
          <ToggleSwitch
            on={flashEnabled}
            toggle={() => dispatch(toggleFlash())}
          />
        </div>
        <div className={styles.settingOption}>
          <p>Default Username</p>
          <input
            className={`${styles.settingTextInput} ${
              darkMode ? `${styles.settingTextInputDark}` : ""
            }`}
            type="text"
            value={defaultUsername}
            onChange={(e) => dispatch(setDefaultUsername(e.target.value))}
          />
        </div>
        <div className={styles.settingOption}>
          <p>Auto Save</p>
          <ToggleSwitch
            on={autoSave}
            toggle={() => dispatch(toggleAutoSave())}
          />
        </div>
        <div className={styles.settingOption}>
          <p>Countdown Timer</p>

          <button
            className={`${styles.countdownBtn} ${styles.decrementBtn} ${
              darkMode
                ? `${styles.decrementBtnDark}`
                : `${styles.decrementBtnLight}`
            }`}
            onClick={() => dispatch(decrementCountdownTimer())}
          >
            -
          </button>
          {"  "}
          {countdownTimer}
          {"  "}
          <button
            className={`${styles.countdownBtn} ${styles.incrementBtn} ${
              darkMode
                ? `${styles.incrementBtnDark}`
                : `${styles.incrementBtnLight}`
            }`}
            onClick={() => dispatch(incrementCountdownTimer())}
          >
            +
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SettingsModal;
