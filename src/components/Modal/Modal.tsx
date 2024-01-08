import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeModal, selectUIModal } from "../../features/ui/uiSlice"

import styles from "./Modal.module.css"

interface ModalProps {
  children?: React.ReactNode
}

function Modal({ children }: ModalProps) {
  const modal = useAppSelector(selectUIModal)
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
