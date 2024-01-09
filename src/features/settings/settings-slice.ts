import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  COUNTDOWN_TIMER_MAX,
  COUNTDOWN_TIMER_MIN,
  DEFAULT_COUNTDOWN_TIMER,
} from "../../constants/settings";

export interface SettingsOptions {
  darkMode: boolean;
  defaultUsername: string;
  autoSave: boolean;
  countdownTimer: number;
}

function parseCountdownTimer(countdownTimer: string | null) {
  // if no saved value, set to default value
  if (!countdownTimer) {
    return DEFAULT_COUNTDOWN_TIMER;
  }

  const n = parseInt(countdownTimer);

  // if not a number, set to default value
  if (isNaN(n)) {
    return DEFAULT_COUNTDOWN_TIMER;
  }

  // check if n is greater or if n is less than the max/min
  if (n > COUNTDOWN_TIMER_MAX) {
    return COUNTDOWN_TIMER_MAX;
  } else if (n < COUNTDOWN_TIMER_MIN) {
    return COUNTDOWN_TIMER_MIN;
  } else {
    return n;
  }
}

function initializeState() {
  // check local storage for saved settings
  const darkMode = localStorage.getItem("darkMode");
  const defaultUsername = localStorage.getItem("defaultUsername");
  const autoSave = localStorage.getItem("autoSave");
  const countdownTimer = localStorage.getItem("countdownTimer");

  const state = {
    darkMode: darkMode ? (darkMode === "true" ? true : false) : false,
    defaultUsername: defaultUsername ? defaultUsername : "username",
    autoSave: autoSave ? (autoSave === "true" ? true : false) : false,
    countdownTimer: parseCountdownTimer(countdownTimer),
  };

  return state;
}

const initialState: SettingsOptions = initializeState();

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode ? "true" : "false");
    },
    setDefaultUsername: (state, action: PayloadAction<string>) => {
      state.defaultUsername = action.payload;
      localStorage.setItem("defaultUsername", state.defaultUsername);
    },
    toggleAutoSave: (state) => {
      state.autoSave = !state.autoSave;
      localStorage.setItem("autoSave", state.autoSave ? "true" : "false");
    },
    incrementCountdownTimer: (state) => {
      // maximum countdown timer is 5
      if (state.countdownTimer >= COUNTDOWN_TIMER_MAX) return;

      state.countdownTimer += 1;
      localStorage.setItem("countdownTimer", String(state.countdownTimer));
    },
    decrementCountdownTimer: (state) => {
      // minimum countdown timer is 2
      if (state.countdownTimer <= COUNTDOWN_TIMER_MIN) return;

      state.countdownTimer -= 1;
      localStorage.setItem("countdownTimer", String(state.countdownTimer));
    },
  },
});

export const {
  toggleDarkMode,
  setDefaultUsername,
  toggleAutoSave,
  incrementCountdownTimer,
  decrementCountdownTimer,
} = settingsSlice.actions;

export const selectDarkModeSetting = (state: RootState) =>
  state.settings.darkMode;
export const selectDefaultUsername = (state: RootState) =>
  state.settings.defaultUsername;
export const selectAutoSaveSetting = (state: RootState) =>
  state.settings.autoSave;
export const selectCountdownTimer = (state: RootState) =>
  state.settings.countdownTimer;

export default settingsSlice.reducer;
