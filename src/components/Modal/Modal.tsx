import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDarkModeSetting } from "../../features/settings/settings-slice";
import { closeModal } from "../../features/ui/ui-slice";

import styles from "./Modal.module.css";

interface ModalProps {
  children?: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkModeSetting);

  function handleCloseModal() {
    dispatch(closeModal());
  }

  return (
    <div className={styles.container} onClick={handleCloseModal}>
      <div
        className={`${styles.modalContainer} ${
          darkMode ? `${styles.darkModal}` : `${styles.lightModal}`
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className={`${styles.closeModalBtn} ${
            darkMode
              ? `${styles.closeModalBtnDark}`
              : `${styles.closeModalBtnLight}`
          }`}
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
