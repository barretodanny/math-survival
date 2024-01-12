import { useAppSelector } from "./app/hooks";
import { selectUIScreen } from "./features/ui/ui-slice";
import { determineUIScreenContent } from "./features/ui/ui";
import { selectDarkModeSetting } from "./features/settings/settings-slice";

import styles from "./App.module.css";

function App() {
  const screen = useAppSelector(selectUIScreen);
  const darkMode = useAppSelector(selectDarkModeSetting);

  return (
    <div
      className={`${styles.container} ${
        darkMode ? `${styles.bgDark}` : `${styles.bgLight}`
      }`}
    >
      <h2
        className={`${styles.heading} ${
          darkMode ? `${styles.headingDark}` : `${styles.headingLight}`
        }`}
      >
        Mad Minute Survival
      </h2>
      {determineUIScreenContent(screen)}
    </div>
  );
}

export default App;
