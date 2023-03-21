import React from 'react'
import ReactDOM from 'react-dom'

import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'

export interface ModalProps {
  header: React.ReactNode
  isOpenModal: boolean
  setClose: () => void
  children: React.ReactNode
  actions: React.ReactNode
}

function Modals({
  header,
  isOpenModal,
  setClose,
  children,
  actions,
}: ModalProps) {
  function closeModal() {
    setClose()
  }

  return ReactDOM.createPortal(
    <Modal isOpen={isOpenModal} onClose={closeModal}>
      <ModalHeader className="text-red-600">{header}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{actions}</ModalFooter>
    </Modal>,
    document.querySelector('#modal') as Element
  )
}

export default Modals
