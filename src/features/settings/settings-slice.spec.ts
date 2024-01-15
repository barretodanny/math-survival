import {
  COUNTDOWN_TIMER_MAX,
  COUNTDOWN_TIMER_MIN,
} from "../../constants/settings";
import settingsReducer, {
  toggleDarkMode,
  setDefaultUsername,
  toggleAutoSave,
  incrementCountdownTimer,
  decrementCountdownTimer,
  SettingsOptions,
} from "./settings-slice";

describe("settings reducer", () => {
  const initialState: SettingsOptions = {
    darkMode: false,
    defaultUsername: "username",
    autoSave: false,
    countdownTimer: 3,
  };

  it("should handle initial state", () => {
    expect(settingsReducer(undefined, { type: "unknown" })).toEqual({
      darkMode: false,
      defaultUsername: "username",
      autoSave: false,
      countdownTimer: 3,
    });
  });

  it("should handle darkMode toggle and saving to local storage", () => {
    let actual = settingsReducer(initialState, toggleDarkMode());
    expect(actual.darkMode).toEqual(true);
    expect(localStorage.getItem("darkMode")).toEqual("true");
    actual = settingsReducer(actual, toggleDarkMode());
    expect(actual.darkMode).toEqual(false);
    expect(localStorage.getItem("darkMode")).toEqual("false");
  });

  it("should handle setting the default username", () => {
    const actual = settingsReducer(initialState, setDefaultUsername("test"));
    expect(actual.defaultUsername).toEqual("test");
    expect(localStorage.getItem("defaultUsername")).toEqual("test");
  });

  it("should handle auto save toggle and saving to local storage", () => {
    let actual = settingsReducer(initialState, toggleAutoSave());
    expect(actual.autoSave).toEqual(true);
    expect(localStorage.getItem("autoSave")).toEqual("true");
    actual = settingsReducer(actual, toggleAutoSave());
    expect(actual.autoSave).toEqual(false);
    expect(localStorage.getItem("autoSave")).toEqual("false");
  });

  it("should handle incrementing the countdown timer and saving to local storage", () => {
    const actual = settingsReducer(initialState, incrementCountdownTimer());
    expect(actual.countdownTimer).toEqual(4);
    expect(localStorage.getItem("countdownTimer")).toEqual("4");
  });

  it("should prevent incrementing the countdown timer past the maximum allowed value", () => {
    let actual = settingsReducer(initialState, incrementCountdownTimer());
    actual = settingsReducer(actual, incrementCountdownTimer());
    expect(actual.countdownTimer).toEqual(5);
    expect(localStorage.getItem("countdownTimer")).toEqual("5");
    actual = settingsReducer(actual, incrementCountdownTimer());
    expect(actual.countdownTimer).toEqual(COUNTDOWN_TIMER_MAX);
    expect(localStorage.getItem("countdownTimer")).toEqual(
      String(COUNTDOWN_TIMER_MAX)
    );
  });

  it("should handle decrementing the countdown timer and saving to local storage", () => {
    const actual = settingsReducer(initialState, decrementCountdownTimer());
    expect(actual.countdownTimer).toEqual(2);
    expect(localStorage.getItem("countdownTimer")).toEqual("2");
  });

  it("should prevent decrementing the countdown timer past the minimum allowed value", () => {
    let actual = settingsReducer(initialState, decrementCountdownTimer());
    expect(actual.countdownTimer).toEqual(2);
    expect(localStorage.getItem("countdownTimer")).toEqual("2");
    actual = settingsReducer(actual, decrementCountdownTimer());
    expect(actual.countdownTimer).toEqual(COUNTDOWN_TIMER_MIN);
    expect(localStorage.getItem("countdownTimer")).toEqual(
      String(COUNTDOWN_TIMER_MIN)
    );
  });
});
