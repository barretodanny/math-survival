import { useEffect, useState } from "react";
import { Score } from "../../types/scores";
import { ScoresSortOrder } from "../../constants/scores";
import { useAppSelector } from "../../app/hooks";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";
import { sortScores } from "../../utils/scores";
import ScoreItem from "../ScoreItem/ScoreItem";
import Up from "../../svg/up.svg";
import Down from "../../svg/down.svg";
import Up2 from "../../svg/up2.svg";
import Down2 from "../../svg/down2.svg";

import styles from "./ScoresTable.module.css";

interface ScoresTableProps {
  fetchedScores: Score[];
}

function ScoresTable({ fetchedScores }: ScoresTableProps) {
  const darkMode = useAppSelector(selectDarkModeSetting);
  const [sortOrder, setSortOrder] = useState(ScoresSortOrder.DATE);
  const [scores, setScores] = useState(fetchedScores);

  useEffect(() => {
    setScores([...sortScores(sortOrder, fetchedScores)]);
  }, [sortOrder, fetchedScores]);

  return (
    <div className={styles.container}>
      {scores.length > 0 ? (
        <div
          className={`${styles.tableContainer} ${
            darkMode ? `${styles.darkBorder2}` : `${styles.lightBorder2}`
          }`}
        >
          <div className={styles.top}>
            <div
              onClick={() => {
                sortOrder === ScoresSortOrder.USERNAME
                  ? setSortOrder(ScoresSortOrder.USERNAME_REVERSE)
                  : setSortOrder(ScoresSortOrder.USERNAME);
              }}
              className={`${styles.topItem} ${
                darkMode ? `${styles.darkBorder}` : `${styles.lightBorder}`
              } ${styles.topFirst} ${
                sortOrder === ScoresSortOrder.USERNAME ||
                sortOrder === ScoresSortOrder.USERNAME_REVERSE
                  ? darkMode
                    ? `${styles.topItemSelectedDark}`
                    : `${styles.topItemSelectedLight}`
                  : darkMode
                  ? `${styles.topItemDark}`
                  : `${styles.topItemLight}`
              }`}
            >
              Username{" "}
              {sortOrder === ScoresSortOrder.USERNAME && (
                <img src={darkMode ? Up2 : Up} className={styles.svg} />
              )}{" "}
              {sortOrder === ScoresSortOrder.USERNAME_REVERSE && (
                <img src={darkMode ? Down2 : Down} className={styles.svg} />
              )}
            </div>
            <div
              className={`${styles.divider} ${
                darkMode ? `${styles.darkDivider}` : `${styles.lightDivider}`
              }`}
            ></div>
            <div
              onClick={() => {
                sortOrder === ScoresSortOrder.SCORE
                  ? setSortOrder(ScoresSortOrder.SCORE_REVERSE)
                  : setSortOrder(ScoresSortOrder.SCORE);
              }}
              className={`${styles.topItem} ${
                darkMode ? `${styles.darkBorder}` : `${styles.lightBorder}`
              } ${styles.topSecond} ${
                sortOrder === ScoresSortOrder.SCORE ||
                sortOrder === ScoresSortOrder.SCORE_REVERSE
                  ? darkMode
                    ? `${styles.topItemSelectedDark}`
                    : `${styles.topItemSelectedLight}`
                  : darkMode
                  ? `${styles.topItemDark}`
                  : `${styles.topItemLight}`
              }`}
            >
              Score{" "}
              {sortOrder === ScoresSortOrder.SCORE && (
                <img src={darkMode ? Up2 : Up} className={styles.svg} />
              )}{" "}
              {sortOrder === ScoresSortOrder.SCORE_REVERSE && (
                <img src={darkMode ? Down2 : Down} className={styles.svg} />
              )}
            </div>
            <div
              className={`${styles.divider} ${
                darkMode ? `${styles.darkDivider}` : `${styles.lightDivider}`
              }`}
            ></div>
            <div
              onClick={() => {
                sortOrder === ScoresSortOrder.DATE
                  ? setSortOrder(ScoresSortOrder.DATE_REVERSE)
                  : setSortOrder(ScoresSortOrder.DATE);
              }}
              className={`${styles.topItem} ${
                darkMode ? `${styles.darkBorder}` : `${styles.lightBorder}`
              } ${styles.topThird} ${
                sortOrder === ScoresSortOrder.DATE ||
                sortOrder === ScoresSortOrder.DATE_REVERSE
                  ? darkMode
                    ? `${styles.topItemSelectedDark}`
                    : `${styles.topItemSelectedLight}`
                  : darkMode
                  ? `${styles.topItemDark}`
                  : `${styles.topItemLight}`
              }`}
            >
              Date{" "}
              {sortOrder === ScoresSortOrder.DATE && (
                <img src={darkMode ? Up2 : Up} className={styles.svg} />
              )}{" "}
              {sortOrder === ScoresSortOrder.DATE_REVERSE && (
                <img src={darkMode ? Down2 : Down} className={styles.svg} />
              )}
            </div>
          </div>
          <div className={styles.scoresContainer}>
            {scores.map((score: Score) => {
              return <ScoreItem key={score.id} score={score} />;
            })}
          </div>
        </div>
      ) : (
        <p
          className={`${styles.text} ${
            darkMode ? `${styles.darkText}` : `${styles.lightText}`
          }`}
        >
          No Scores Found
        </p>
      )}
    </div>
  );
}

export default ScoresTable;
