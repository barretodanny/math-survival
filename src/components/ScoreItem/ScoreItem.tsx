import { useAppSelector } from "../../app/hooks";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";
import { Score } from "../../types/scores";
import { getTimeAgo } from "../../utils/scores";

import styles from "./ScoreItem.module.css";

interface ScoreItemProps {
  score: Score;
}

function ScoreItem({ score }: ScoreItemProps) {
  const darkMode = useAppSelector(selectDarkModeSetting);
  const timeAgo = getTimeAgo(score.date);

  return (
    <div
      className={`${styles.scoreContainer} ${
        darkMode ? `${styles.darkContainer}` : `${styles.lightContainer}`
      }`}
    >
      <div className={styles.scoreFirst}>{score.username}</div>
      <div
        className={`${styles.divider} ${
          darkMode ? `${styles.darkDivider}` : `${styles.lightDivider}`
        }`}
      ></div>
      <div className={styles.scoreSecond}>{score.score}</div>
      <div
        className={`${styles.divider} ${
          darkMode ? `${styles.darkDivider}` : `${styles.lightDivider}`
        }`}
      ></div>
      <div className={styles.scoreThird}>{timeAgo}</div>
    </div>
  );
}

export default ScoreItem;
