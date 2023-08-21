import { useMemo } from 'react'

const TRUSTED_URLS = [
  'amazon.ca',
  'amazon.cn',
  'amazon.co.jp',
  'amazon.com',
  'amazon.com.au',
  'amazon.com.mx',
  'amazon.co.uk',
  'amazon.de',
  'amazon.es',
  'amazon.eu',
  'amazon.fr',
  'amazon.in',
  'amazon.it',
  'amazonlogistics.com',
  'amazonlogistics.eu',
  'amazon.nl',
  'amazonpay.com',
  'amazonpay.in',
  'amazonpayments.com',
  'amazon.sa',
  'amazontrust.com',
  'amzn.to',
]

const ExternalLink: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
  children,
  href,
  ...props
}) => {
  // TODO: move trusted urls elsewhere?, or trust by default for now?
  // TODO: combine all urls into single regex
  const trusted = useMemo(
    () => TRUSTED_URLS.some((regex) => !!href.match(regex)),
    [href]
  )

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
