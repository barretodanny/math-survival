import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { UIModalState, UIScreenState } from "../../constants/ui"

export interface UIState {
  screen: UIScreenState
  modal: UIModalState
}

const initialState: UIState = {
  screen: UIScreenState.SETUP_GAME,
  modal: UIModalState.NONE,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSetupScreen: (state) => {
      state.screen = UIScreenState.SETUP_GAME
    },
    showCountdownScreen: (state) => {
      state.screen = UIScreenState.COUNTDOWN
    },
    showGameScreen: (state) => {
      state.screen = UIScreenState.IN_GAME
    },
    showPostGameScreen: (state) => {
      state.screen = UIScreenState.POST_GAME
    },
    showSettingsModal: (state) => {
      state.modal = UIModalState.SETTINGS
    },
    showScoresModal: (state) => {
      state.modal = UIModalState.SCORES
    },
    closeModal: (state) => {
      state.modal = UIModalState.NONE
    },
  },
})

export const {
  showSetupScreen,
  showCountdownScreen,
  showGameScreen,
  showPostGameScreen,
  showSettingsModal,
  showScoresModal,
  closeModal,
} = uiSlice.actions

export const selectUIScreen = (state: RootState) => state.ui.screen
export const selectUIModal = (state: RootState) => state.ui.modal

export default uiSlice.reducer
