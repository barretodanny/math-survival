import styles from "./ToggleSwitch.module.css";

interface ToggleSwitchProps {
  on: boolean;
  toggle: () => {
    payload: undefined;
    type: string;
  };
}

function ToggleSwitch({ on, toggle }: ToggleSwitchProps) {
  return (
    <div
      className={`${styles.container} ${on ? `${styles.on}` : ""}`}
      onClick={toggle}
    >
      <div className={styles.ball}></div>
    </div>
  );
}

export default ToggleSwitch;
