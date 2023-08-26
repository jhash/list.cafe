import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer'

import { DigestHandler } from './digestLink'

// const puppeteer = require('puppeteer-core')

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
  let browser

  try {
    link = `${
      originalLink.match(AMAZON_REGEX)?.[0] || originalLink.replace(/\?.*/g, '')
    }?tag=${process.env.AMAZON_ASSOCIATE_ID}`

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless:
        process.env.NODE_ENV === 'development' ? 'new' : chromium.headless,
      ignoreHTTPSErrors: true,
      // headless: 'new',
    })

    const page = await browser.newPage()

    await page.goto(originalLink)

    await page.waitForSelector('#imgTagWrapperId img')

    const productTitle = await page.$('#productTitle')

    if (productTitle) {
      title = (
        (await page.evaluate(
          (el: HTMLSpanElement) => el.textContent,
          productTitle
        )) ||
        (await page.title()) ||
        ''
      ).trim()
    }

    const productDescription = await page.$('#productDescription')

    if (productDescription) {
      description = (
        (await page.evaluate(
          (el: HTMLSpanElement) => el.textContent,
          productDescription
        )) ||
        (await page.evaluate(
          () =>
            (
              document.querySelector('meta[name="description"]') as
                | HTMLMetaElement
                | undefined
            )?.content
        )) ||
        ''
      ).trim()
    }

    const imageElements = await page.$$('#imgTagWrapperId')
    console.log(imageElements.length, 'elements')
    images = []
    for (const imageElement of imageElements) {
      images.push(
        await page.evaluate(
          (element) => ({
            src: element.querySelector('img').getAttribute('src'),
            alt:
              element.querySelector('img').getAttribute('alt') || 'Link image',
          }),
          imageElement
        )
      )
    }
  } catch (error) {
    console.error(error)
  } finally {
    browser?.close?.()
  }

  return {
    link,
    title,
    images,
    description,
  }
}
