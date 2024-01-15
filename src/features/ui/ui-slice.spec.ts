import { UIModalState, UIScreenState } from "../../constants/ui";
import uiReducer, {
  UIState,
  showSetupScreen,
  showCountdownScreen,
  showGameScreen,
  showPostGameScreen,
  showHowToPlayModal,
  showSettingsModal,
  showScoresModal,
  closeModal,
} from "./ui-slice";

describe("ui reducer", () => {
  const initialState: UIState = {
    screen: UIScreenState.SETUP_GAME,
    modal: UIModalState.NONE,
  };

  it("should handle initial state", () => {
    expect(uiReducer(undefined, { type: "unknown" })).toEqual({
      screen: UIScreenState.SETUP_GAME,
      modal: UIModalState.NONE,
    });
  });

  it("should handle showSetupScreen", () => {
    const actual = uiReducer(
      { ...initialState, screen: UIScreenState.COUNTDOWN },
      showSetupScreen()
    );
    expect(actual.screen).toEqual(UIScreenState.SETUP_GAME);
  });

  it("should handle showCountdownScreen", () => {
    const actual = uiReducer(initialState, showCountdownScreen());
    expect(actual.screen).toEqual(UIScreenState.COUNTDOWN);
  });

  it("should handle showGameScreen", () => {
    const actual = uiReducer(initialState, showGameScreen());
    expect(actual.screen).toEqual(UIScreenState.IN_GAME);
  });

  it("should handle showPostGameScreen", () => {
    const actual = uiReducer(initialState, showPostGameScreen());
    expect(actual.screen).toEqual(UIScreenState.POST_GAME);
  });

  it("should handle closeModal", () => {
    const actual = uiReducer(
      { ...initialState, modal: UIModalState.SETTINGS },
      closeModal()
    );
    expect(actual.modal).toEqual(UIModalState.NONE);
  });

  it("should handle showHowToPlayModal", () => {
    const actual = uiReducer(initialState, showHowToPlayModal());
    expect(actual.modal).toEqual(UIModalState.HOW_TO_PLAY);
  });

  it("should handle showSettingsModal", () => {
    const actual = uiReducer(initialState, showSettingsModal());
    expect(actual.modal).toEqual(UIModalState.SETTINGS);
  });

  it("should handle showScoresModal", () => {
    const actual = uiReducer(initialState, showScoresModal());
    expect(actual.modal).toEqual(UIModalState.SCORES);
  });
});
