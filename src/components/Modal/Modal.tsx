import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

interface BackdropProps {
  onClose: () => void
}

interface ModalOverlayProps {
  children: React.ReactNode
  onClose: () => void
}

interface ModalProps extends BackdropProps, ModalOverlayProps {}

const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className={styles.backDrop} onClick={onClose}></div>
}

const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
  return (
    <div className={styles.modal}>
      <div className="w-full py-6 text-center">
        <p>{children}</p>
      </div>
      <button
        className="w-full py-4 transition-colors duration-200 ease-in bg-teal-500 border-t-2 border-black hover:bg-teal-600 focus:bg-teal-600 "
        onClick={onClose}
        type="button"
      >
        확인
      </button>
    </div>
  )
}

const portalElement: HTMLElement | null = document.getElementById('overlays')

const Modal = ({ onClose, children }: ModalProps) => {
  if (portalElement) {
    return (
      <>
        {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
        {ReactDOM.createPortal(
          <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
          portalElement,
        )}
      </>
    )
  }

  return null
}

export default Modal
