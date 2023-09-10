import { HTMLProps } from 'react'

import classNames from 'classnames'
import copy from 'copy-text-to-clipboard'
import isString from 'lodash/isString'

import { toast } from '@redwoodjs/web/dist/toast'

type CopyToClipboardProps = HTMLProps<HTMLButtonElement> & {
  text: string
  message?: string
}
const CopyToClipboard = ({ children, text, message }: CopyToClipboardProps) => {
  return (
    <button
      type="button"
      className={classNames(
        'cursor-pointer',
        isString(children) && 'hover:opacity-80'
      )}
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
