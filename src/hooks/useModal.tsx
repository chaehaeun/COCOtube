import { useCallback, useState } from 'react'

const useModal = () => {
  const [modalState, setModalState] = useState<{
    showModal: boolean
    content: string
    onClose?: () => void
  }>({ showModal: false, content: '' })

  const openModal = useCallback((content: string, onClose?: () => void) => {
    setModalState({ showModal: true, content, onClose })
  }, [])

  const closeModal = useCallback(() => {
    if (modalState.onClose) {
      modalState.onClose()
    }
    setModalState({ showModal: false, content: '', onClose: undefined })
  }, [modalState])

  return { ...modalState, openModal, closeModal }
}

export default useModal
