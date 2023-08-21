const AMAZON_URLS = [
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

const mapUrlsToRegex = (urls: string[]) =>
  new RegExp(
    `^(https?:\/\/)?(${urls.map((url) => url.replace('.', '\\.')).join('|')})`,
    'gmi'
  )

export const AMAZON_REGEX = mapUrlsToRegex(AMAZON_URLS)

export const TRUSTED_URLS = [...AMAZON_URLS]

export const TRUSTED_REGEX = mapUrlsToRegex(TRUSTED_URLS)
