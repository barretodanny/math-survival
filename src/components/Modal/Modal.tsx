import { useAppDispatch } from "../../app/hooks"
import { closeModal } from "../../features/ui/ui-slice"

import styles from "./Modal.module.css"

interface ModalProps {
  children?: React.ReactNode
}

function Modal({ children }: ModalProps) {
  const dispatch = useAppDispatch()

  function handleCloseModal() {
    dispatch(closeModal())
  }

  return (
    <div className={styles.container} onClick={handleCloseModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className={styles.closeModalBtn} onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
