import { HTMLProps } from 'react'

import { LIST_CAFE_DOMAIN, LIST_CAFE_URL } from 'src/constants/urls'

import CopyToClipboard from '../CopyToClipboard/CopyToClipboard'

type CopyListCafeLinkProps = HTMLProps<HTMLAnchorElement> & {
  path: string
}
const CopyListCafeLink = ({ path, children }: CopyListCafeLinkProps) => {
  return (
    <CopyToClipboard
      text={`${LIST_CAFE_URL}${path[0] === '/' ? '' : '/'}${path}`}
      message="Copied link to clipboard"
    >
      {children || `${LIST_CAFE_DOMAIN}${path[0] === '/' ? '' : '/'}${path}`}
    </CopyToClipboard>
  )
}

export default CopyListCafeLink
