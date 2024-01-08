import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import uiReducer from "../features/ui/ui-slice"
import optionsReducer from "../features/options/options-slice"

export const store = configureStore({
  reducer: { ui: uiReducer, options: optionsReducer },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
