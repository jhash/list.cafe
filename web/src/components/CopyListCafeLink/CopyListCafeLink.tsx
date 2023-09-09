import { HTMLProps, Suspense, lazy } from 'react'

import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'

import Loading from 'src/components/Loading'
import { LIST_CAFE_DOMAIN, LIST_CAFE_URL } from 'src/constants/urls'

const CopyToClipboard = lazy(() => import('../CopyToClipboard/CopyToClipboard'))

type CopyListCafeLinkProps = HTMLProps<HTMLAnchorElement> & {
  path: string
}
const CopyListCafeLink = ({ path, children }: CopyListCafeLinkProps) => {
  return (
    <BrowserOnly>
      <Suspense fallback={<Loading />}>
        <CopyToClipboard
          text={`${LIST_CAFE_URL}${path[0] === '/' ? '' : '/'}${path}`}
          message="Copied link to clipboard"
        >
          {children ||
            `${LIST_CAFE_DOMAIN}${path[0] === '/' ? '' : '/'}${path}`}
        </CopyToClipboard>
      </Suspense>
    </BrowserOnly>
  )
}

export default CopyListCafeLink
