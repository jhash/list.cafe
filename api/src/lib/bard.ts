import { ListType } from '@prisma/client'
import { gotScraping } from 'got-scraping'
import { JSDOM, VirtualConsole } from 'jsdom'
import { jsonrepair } from 'jsonrepair'

import { DigestedList } from 'src/functions/digestLink/digestLink'

const { TextServiceClient } = require('@google-ai/generativelanguage').v1beta2
const { GoogleAuth } = require('google-auth-library')

const MODEL_NAME = 'models/text-bison-001'

const virtualConsole = new VirtualConsole()
virtualConsole.on('error', () => {
  // No-op to skip console errors.
})

interface GoogleTextMatchCandidate {
  output?: string
}

interface UnfilteredList {
  name?: string
  description?: string
  headerImage?: string
  type?: keyof typeof CATEGORY_PROMPT_KEY_MAP
  listItems: {
    description?: string
    title?: string
    image?: string
    quantity?: string | number
    price?: string | number
    url?: string
  }[]
}

// const UNFILTERED_LIST_TEMPLATE = {
//   name: 'string',
//   description: 'string',
//   headerImage: 'url',
//   type: 'list type',
//   listItems: [
//     {
//       description: 'string',
//       title: 'string',
//       image: 'url',
//       quantity: 'number',
//       price: 'number',
//       url: 'url',
//     },
//   ],
// }

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
    // temperature: 0.8,
    // candidates: 2,
    safetySettings: [],
  })

const getListFromHTML = async (text: string) => {
  const result = ((await generateText(text)) || [{ candidates: [] }]) as [
    { candidates: GoogleTextMatchCandidate[] }
  ]
  // console.log(JSON.stringify(result, null, 2))

  const [first] = result

  const { candidates } = first

  return candidates.map((candidate) => candidate.output).join('\n')
}

const GOOGLE_BYTE_LIMIT = 48000

// const splitAndGetListFromHTML = async (size: number, html: string) => {
//   const parts = Math.floor(size / GOOGLE_BYTE_LIMIT)
//   const chunkSize = Math.floor(html.length / parts)

//   console.log(parts, chunkSize)

//   return (
//     await Promise.all(
//       [...Array(parts).keys()].map((part) => {
//         console.log(part)
//         const slice = html.slice(
//           part * chunkSize,
//           part === parts - 1 ? undefined : part * chunkSize + chunkSize
//         )

//         console.log(slice)

//         return getListFromHTML(slice)
//       })
//     )
//   ).join('\n')
// }

const CATEGORY_PROMPT_KEY_MAP: { [prompt: string]: ListType } = {
  'github awesome list': 'AWESOME',
  'baby shower registry': 'BABY_SHOWER',
  bookmarks: 'BOOKMARKS',
  'favorites list': 'FAVORITES',
  forum: 'FORUM',
  'gift list': 'GIFTS',
  inventory: 'INVENTORY',
  'jobs list': 'JOBS',
  linktree: 'LINKTREE',
  'social list (like pinterest)': 'SOCIAL',
  table: 'TABLE',
  'todo list': 'TODO',
  'top 10 list': 'TOP',
  'wedding registry': 'WEDDING',
  wishlist: 'WISHLIST',
  'back to school': 'SCHOOL',
}

const PROMPT = `Can you extract a list with a name, description, a header image, and a type from the following options: [${Object.keys(
  CATEGORY_PROMPT_KEY_MAP
).join(
  ', '
)}], with a list of listItems that each include a title, description, url, price, quantity, and an image, all in a consistent JSON data structure, from the following text? `
//  formatted like this example: \`\`\`json${JSON.stringify(
//   UNFILTERED_LIST_TEMPLATE
// )}\`\`\`

const NUMBER_OF_CHARACTERS = 100
const popCharactersUntilValid = (original: string) => {
  let text = original
  for (let i = 0; i < NUMBER_OF_CHARACTERS; i++) {
    try {
      text = jsonrepair(text)
      console.log('repaired')
      JSON.parse(text)
      console.log('parsed')

      console.log(`\nStripped off ${i} characters\n`)
      return text
    } catch (error) {
      console.log('failed to parse', text)
      text = text.slice(0, original.length - 1 - i)
    }
  }

  throw new Error(`Failed to parse after popping off ${NUMBER_OF_CHARACTERS}`)
}

const PROMPT_MAX_SIZE = 1000

export const convertLinkToList = async (link: string) => {
  const { body } = await gotScraping.get(link)
  const dom = new JSDOM(body, { virtualConsole })

  dom.window.document
    .querySelectorAll(
      'script,symbol,link,iframe,footer,nav,svg,path,defs,details,.cmplz-cookiebanner,aside,form,.navLeftFooter,noscript,#navbar,style,.js-header-wrapper'
    )
    .forEach((element) => element?.remove())

  dom.window.document.body.innerHTML =
    dom.window.document.body.innerHTML.replace(/<\!--.*?-->/gim, '')

  const html = [
    ...[
      ...dom.window.document.querySelectorAll(
        'h1,h2,h3,h4,h5,h6,b,strong,em,hgroup'
      ),
    ].map((element) => element.textContent),
    ...[...dom.window.document.querySelectorAll('a')]
      .filter((element) => {
        const href = element.getAttribute('href')
        return !!href && !!href.match('http')
      })
      .map(
        (element) =>
          [element.textContent] // , element.getAttribute('href')]
            .filter(Boolean)
            .join(' ')
        // `[${
        //   element.textContent ||
        //   element.getAttribute('aria-label') ||
        //   element.getAttribute('title') ||
        //   element.getAttribute('href')
        // }](${element.getAttribute('href')})`
      ),
    ...[...dom.window.document.querySelectorAll('img')]
      .filter(
        (element) => element.getAttribute('src') && element.getAttribute('alt')
      )
      .map(
        (element) => element.getAttribute('alt')
        // `![${
        //   element.getAttribute('alt') ||
        //   element.getAttribute('aria-label') ||
        //   ''
        // }](${element.getAttribute('src')})`
      ),
    ...[
      ...dom.window.document.querySelectorAll(
        'div,span,p,q,blockquote,code,li,details,summary,small,article'
      ),
    ].map((element) => element.textContent),
  ]
    .join(' ')
    .replace(/\s\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, PROMPT_MAX_SIZE)

  let text = `${PROMPT}${html}`
  console.log('Prompt:', text)
  const size = new Blob([text]).size

  if (size >= GOOGLE_BYTE_LIMIT) {
    console.log('size is big')
    text = text.slice(
      0,
      Math.floor(text.length / Math.floor(size / GOOGLE_BYTE_LIMIT))
    )
  }
  // text = await splitAndGetListFromHTML(size, html)

  text = await getListFromHTML(text)

  text = text.replace('\\n', '').replace('\n', ' ')

  // console.log('\ntext before filtering: ', text)

  if (text.match('```')) {
    text = text.replace(/[^\{]*\`\`\`[^\{]*/gim, '').trim()
    // console.log('\ntext after replacing: ', text)

    try {
      text = popCharactersUntilValid(text)
      const unfiltered: UnfilteredList = JSON.parse(text)

      const type = CATEGORY_PROMPT_KEY_MAP[unfiltered.type] || 'WISHLIST'

      const list: DigestedList = {
        // TODO: tag insertion
        link,
        name: unfiltered.name || type,
        type,
        headerImage: unfiltered.headerImage,
        description: unfiltered.description,
        listItems: (unfiltered.listItems || []).map((listItem, index) => ({
          url: listItem.url,
          title: listItem.title || `Item ${index}`,
          description: listItem.description,
          price: listItem.price ? +listItem.price : undefined,
          quantity: listItem.quantity ? +listItem.quantity : undefined,
          images: (listItem.image ? [listItem.image] : []).map((image) => ({
            url: image,
            alt: listItem.title || image,
          })),
        })),
      }

      return list
    } catch (error) {
      console.log('Failed to parse json from text: ', text)
    }
  } else {
    console.log('Text does not contain json: ', text)
  }

  throw new Error('We failed to fetch a list or item from this link')
}
