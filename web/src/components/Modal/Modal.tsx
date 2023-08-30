import { useEffect, useMemo } from 'react'

import { X } from 'lucide-react'

import SectionTitle from '../SectionTitle/SectionTitle'

type ModalProps = React.HTMLProps<HTMLDialogElement> & {
  onClose: () => void
  title: string
  open: boolean
}
const Modal = ({ open, title, onClose, children, ...props }: ModalProps) => {
  const id = useMemo(() => {
    return `${Date.now()}-${Math.floor(Math.random() * 100)}`
  }, [])

  useEffect(() => {
    if (open) {
      window?.[id]?.showModal()
    } else {
      window?.[id]?.close()
    }
  }, [open, id])

  return (
    <dialog
      id={id}
      {...props}
      className="modal modal-bottom z-40 cursor-default p-0 sm:modal-middle sm:p-4"
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
