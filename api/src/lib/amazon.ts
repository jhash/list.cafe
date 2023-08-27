import { gotScraping } from 'got-scraping'
import { JSDOM } from 'jsdom'

import { DigestHandler, DigestedItem } from '../functions/digestLink/digestLink'

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

const createAmazonRegex = (innerSection: string) =>
  new RegExp(
    `https?\\:\\/\\/(www)?.(${AMAZON_URLS.join('|').replaceAll(
      '.',
      '\\.'
    )})\\/(.+\\/)?${innerSection}([^\\/\\?]+)(?=\\/?.+\\??.+)`,
    'g'
  )
const AMAZON_REGEX_PRODUCT_SECTION = '((dp|gp)\\/)(product\\/)?'
export const AMAZON_PRODUCT_REGEX = createAmazonRegex(
  AMAZON_REGEX_PRODUCT_SECTION
)
const AMAZON_REGEX_WISHLIST_SECTION = '(hz/)(wishlist/)?(ls/)?'
export const AMAZON_WISHLIST_REGEX = createAmazonRegex(
  AMAZON_REGEX_WISHLIST_SECTION
)

const insertAmazonTags = (link: string, regex: RegExp) => {
  return `${link.match(regex)?.[0] || link.replace(/\?.*/g, '')}?tag=${
    process.env.AMAZON_ASSOCIATE_ID
  }`
}

// console.log('AMAZON_PRODUCT_REGEX', AMAZON_PRODUCT_REGEX)
// console.log('AMAZON_WISHLIST_REGEX', AMAZON_WISHLIST_REGEX)

export const fetchAmazonProductLink: DigestHandler = async (
  originalLink: string
) => {
  let url = originalLink
  let images = []
  let title = ''
  let description = ''

  try {
    url = insertAmazonTags(originalLink, AMAZON_PRODUCT_REGEX)

    const { body } = await gotScraping.get(originalLink)
    // console.log(body)
    const dom = new JSDOM(body)
    images = [
      ...dom.window.document.querySelectorAll('#imgTagWrapperId img'),
    ].map((element) => ({
      url: element.getAttribute('src'),
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
    listItems: [{ url, title, images, description, quantity: 1 }],
    name: 'My Amazon Wishlist',
    type: 'WISHLIST',
  }
}

export const fetchAmazonWishlistLink: DigestHandler = async (
  originalLink: string
) => {
  let link = originalLink
  let listItems: DigestedItem[] = []
  let name = ''
  // const groupName = ''
  // const description = ''

  try {
    link = insertAmazonTags(originalLink, AMAZON_WISHLIST_REGEX)

    const { body } = await gotScraping.get(
      `${originalLink.replace(/\?.*/, '')}?viewType=list`
    )
    const dom = new JSDOM(body)

    // groupName =
    //   dom.window.document
    //     .querySelector('g-list-header-wrapper')
    //     ?.textContent.trim() || ''

    name =
      dom.window.document
        .querySelector('#profile-list-name')
        ?.textContent.trim() || ''

    listItems = [...dom.window.document.querySelectorAll('.a-list-item')]
      .filter((element) => !!element.querySelector('img'))
      .map((element) => {
        const img = element.querySelector('img')
        const itemName = element.querySelector("[id^='itemName']")
        const url = insertAmazonTags(
          `https://amazon.com${itemName.getAttribute('href') || ''}`,
          AMAZON_PRODUCT_REGEX
        )
        const title = (itemName?.textContent || img.getAttribute('alt')).trim()
        const quantity = +(
          element
            .querySelector("span[id^='itemRequested_']")
            ?.textContent.trim() || 1
        )

        return {
          images: [
            {
              url: img.getAttribute('src'),
              alt: title,
            },
          ],
          title,
          url,
          quantity,
        }
      })
  } catch (error) {
    console.error(error)
  }

  return {
    link,
    name,
    listItems,
    type: 'WISHLIST',
  }
}
