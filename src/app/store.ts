import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import uiReducer from "../features/ui/ui-slice"
import optionsReducer from "../features/options/options-slice"
import settingsReducer from "../features/settings/settings-slice"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    options: optionsReducer,
    settings: settingsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
