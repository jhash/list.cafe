import { X } from 'lucide-react'

import SectionTitle from '../SectionTitle/SectionTitle'

type ModalProps = React.HTMLProps<HTMLDialogElement> & {
  onClose: () => void
  title: string
}
const Modal = ({ title, onClose, children, ...props }: ModalProps) => {
  return (
    <dialog
      {...props}
      className="modal modal-bottom z-40 p-0 sm:modal-middle sm:p-4"
    >
      <div className="modal-box relative flex max-h-full min-h-screen flex-col gap-y-6 rounded-none sm:h-auto sm:min-h-0 sm:rounded-lg">
        <div className="flex items-center gap-3">
          <div className="flex-grow">
            <SectionTitle>{title}</SectionTitle>
          </div>
          <button
            className="btn flex h-8 min-h-0 w-8 items-center justify-center rounded-full p-0"
            onClick={onClose}
            type="button"
          >
            <X size="1.125rem" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
