import { HTMLProps } from 'react'

import copy from 'copy-text-to-clipboard'

import { toast } from '@redwoodjs/web/dist/toast'

type CopyToClipboardProps = HTMLProps<HTMLButtonElement> & {
  text: string
  message?: string
}
const CopyToClipboard = ({ children, text, message }: CopyToClipboardProps) => {
  return (
    <button
      type="button"
      className="cursor-pointer hover:opacity-80"
      onClick={() => {
        copy(text)
        toast.success(message || 'Copied to clipboard')
      }}
    >
      {children}
    </button>
  )
}

export default CopyToClipboard
