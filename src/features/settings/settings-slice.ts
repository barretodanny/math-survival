import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface SettingsOptions {
  darkMode: boolean
  defaultUsername: string
  autoSave: boolean
  countdownTimer: number
}

const initialState: SettingsOptions = {
  darkMode: false, // TODO: fetch from localstorage
  defaultUsername: "username", // TODO: fetch from localstorage
  autoSave: false, // TODO: fetch from localstorage
  countdownTimer: 3, // TODO: fetch from localstorage
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setDefaultUsername: (state, action: PayloadAction<string>) => {
      state.defaultUsername = action.payload
    },
    toggleAutoSave: (state) => {
      state.autoSave = !state.autoSave
    },
    incrementCountdownTimer: (state) => {
      // maximum countdown timer is 5
      if (state.countdownTimer >= 5) return

      state.countdownTimer += 1
    },
    decrementCountdownTimer: (state) => {
      // minimum countdown timer is 2
      if (state.countdownTimer <= 2) return

      state.countdownTimer -= 1
    },
  },
})

export const {
  toggleDarkMode,
  setDefaultUsername,
  toggleAutoSave,
  incrementCountdownTimer,
  decrementCountdownTimer,
} = settingsSlice.actions

export const selectDarkModeSetting = (state: RootState) =>
  state.settings.darkMode
export const selectDefaultUsername = (state: RootState) =>
  state.settings.defaultUsername
export const selectAutoSaveSetting = (state: RootState) =>
  state.settings.autoSave
export const selectCountdownTimer = (state: RootState) =>
  state.settings.countdownTimer

export default settingsSlice.reducer
