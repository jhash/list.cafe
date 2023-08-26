let chromium = {
  args: [],
  defaultViewport: '',
  executablePath: undefined,
  headless: 'new',
}
let puppeteer

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chromium = require('@sparticuz/chromium')
  puppeteer = require('puppeteer-core')
} else {
  // running locally.
  puppeteer = require('puppeteer')
}

const LOCAL_CHROME_EXECUTABLE =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// import chromium from 'chromium-aws-lambda'
// import puppeteer from 'puppeteer'

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
  let browser

  try {
    link = `${
      originalLink.match(AMAZON_REGEX)?.[0] || originalLink.replace(/\?.*/g, '')
    }?tag=${process.env.AMAZON_ASSOCIATE_ID}`

    // browser = await puppeteer.launch({
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless:
    //     process.env.NODE_ENV === 'development' ? 'new' : chromium.headless,
    //   ignoreHTTPSErrors: true,
    //   // headless: 'new',
    // })

    // browser = await puppeteer.launch({
    //   args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: true,
    //   ignoreHTTPSErrors: true,
    // })

    const executablePath =
      (await chromium.executablePath) || LOCAL_CHROME_EXECUTABLE

    const browser = await puppeteer.launch({
      executablePath,
      // args: chromium.args,
      args: [
        ...chromium.args,
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
      ],
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless || 'new',
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
