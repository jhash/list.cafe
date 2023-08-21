import { useMemo } from 'react'

import { TRUSTED_REGEX } from 'src/constants/urls'

const ExternalLink: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
  children,
  href,
  ...props
}) => {
  const trusted = useMemo(() => href.match(TRUSTED_REGEX), [href])

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      target={'_blank'}
      rel={trusted ? '' : 'noreferrer'}
      href={href}
      {...props}
    >
      {children}
    </a>
  )
}

export default ExternalLink
