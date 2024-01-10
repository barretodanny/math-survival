import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui-slice";
import settingsReducer from "../features/settings/settings-slice";
import gameReducer from "../features/game/game-slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    settings: settingsReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
