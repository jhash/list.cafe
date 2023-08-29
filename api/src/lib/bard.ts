import { gotScraping } from 'got-scraping'
import { JSDOM } from 'jsdom'
// import { ListType } from 'types/graphql'

const { TextServiceClient } = require('@google-ai/generativelanguage').v1beta2
const { GoogleAuth } = require('google-auth-library')

const MODEL_NAME = 'models/text-bison-001'

interface GoogleTextMatchCandidate {
  output?: string
}

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(
    process.env.GOOGLE_MAKERSUITE_API_KEY
  ),
})

export const generateText = (text: string) =>
  client.generateText({
    model: MODEL_NAME,
    prompt: {
      text,
    },
  })

const getCategoryFromHTML = async (html: string) => {
  const [first] = ((await generateText(`${CATEGORY_PROMPT}${html}`)) || [
    { candidates: [] },
  ]) as [{ candidates: GoogleTextMatchCandidate[] }]

  const { candidates } = first
  console.log(candidates)

  return candidates.map((candidate) => candidate.output).join('\n')
}

const getListFromHTML = async (html: string) => {
  const [first] = ((await generateText(`${PROMPT}${html}`)) || [
    { candidates: [] },
  ]) as [{ candidates: GoogleTextMatchCandidate[] }]

  const { candidates } = first
  console.log(candidates)

  return candidates.map((candidate) => candidate.output).join('\n')
}

const GOOGLE_BYTE_LIMIT = 20000

const splitAndGetListFromHTML = async (size: number, html: string) => {
  const parts = Math.floor(size / GOOGLE_BYTE_LIMIT)
  const chunkSize = Math.floor(html.length / parts)

  console.log(parts, chunkSize)

  return (
    await Promise.all(
      [...Array(parts).keys()].map((part) => {
        console.log(part)
        const slice = html.slice(
          part * chunkSize,
          part === parts - 1 ? undefined : part * chunkSize + chunkSize
        )

        console.log(slice)

        return getListFromHTML(slice)
      })
    )
  ).join('\n')
}

const CATEGORY_PROMPT = `Can you categorize this text as one of these options: ${[
  'github awesome list',
  'baby shower registry',
  'bookmarks',
  'favorites list',
  'forum',
  'gifts',
  'inventory',
  'jobs list',
  'linktree',
  'social',
  'table',
  'todo',
  'top 10 list',
  'wedding registry',
  'wishlist',
  'informational',
].join(', ')}, where the text is: `

const PROMPT =
  'Can you turn the following text into a list that has a title, description, and header image, and a list of items that each include a title, description, url, price, location, and image, all in a JSON data structure consistent across requests? '
export const convertLinkToList = async (link: string) => {
  const { body } = await gotScraping.get(link)
  const dom = new JSDOM(body)
  let type = 'WISHLIST'

  dom.window.document
    .querySelectorAll(
      'script,symbol,link,iframe,footer,nav,svg,path,defs,details,.cmplz-cookiebanner,aside,form,.navLeftFooter,noscript,#navbar,style,.js-header-wrapper'
    )
    .forEach((element) => element?.remove())

  const html = [
    dom.window.document.body.textContent
      .replace(/<\!--.*?-->/gim, '')
      .replace(/\s\s+/g, '\n'),
    // ...[...dom.window.document.querySelectorAll('img')]
    //   .filter((element) => element.getAttribute('src'))
    //   .map(
    //     (element) =>
    //       `src=${element.getAttribute('src')},alt=${element.getAttribute(
    //         'alt'
    //       )}`
    //   ),
    // ...[...dom.window.document.querySelectorAll('a')]
    //   .filter((element) => element.getAttribute('href'))
    //   .map(
    //     (element) =>
    //       `href=${element.getAttribute('href')},label=${
    //         element.getAttribute('aria-label') || element.getAttribute('title')
    //       }`
    //   ),
  ].join('\n')
  console.log('html', html)

  let text = html
  const size = Math.abs(new Blob([html]).size + new Blob([PROMPT]).size)
  console.log(size)
  type = await getCategoryFromHTML(html)

  if (size >= GOOGLE_BYTE_LIMIT) {
    console.log('size is big')
    text = await splitAndGetListFromHTML(size, html)
  } else {
    console.log('size is not big ?')

    console.log(type)
    text = await getListFromHTML(html)
  }

  return JSON.stringify(text)
}
