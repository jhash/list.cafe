import { gotScraping } from 'got-scraping'
import { JSDOM } from 'jsdom'

import { DigestHandler } from '../functions/digestLink/digestLink'

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

export const AMAZON_REGEX = new RegExp(
  `https?\\:\\/\\/(www)?.(${AMAZON_URLS.join('|').replaceAll(
    '.',
    '\\.'
  )})\\/(.+\\/)?((dp|gp)\\/)(product\\/)?([^\\/\\?]+)(?=\\/?.+\\??.+)`,
  'g'
)

export const fetchAmazonLink: DigestHandler = async (originalLink: string) => {
  let link = originalLink
  let images = []
  let title = ''
  let description = ''

  try {
    link = `${
      originalLink.match(AMAZON_REGEX)?.[0] || originalLink.replace(/\?.*/g, '')
    }?tag=${process.env.AMAZON_ASSOCIATE_ID}`

    const { body } = await gotScraping.get(originalLink)
    // console.log(body)
    const dom = new JSDOM(body)
    images = [
      ...dom.window.document.querySelectorAll('#imgTagWrapperId img'),
    ].map((element) => ({
      src: element.getAttribute('src'),
      alt: element.getAttribute('alt'),
    }))

    title =
      dom.window.document.querySelector('#productTitle')?.textContent.trim() ||
      ''

    description =
      dom.window.document
        .querySelector('#productDescription')
        ?.textContent.trim() || ''
  } catch (error) {
    console.error(error)
  }

  return {
    link,
    title,
    images,
    description,
  }
}
