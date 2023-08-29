import type { APIGatewayEvent, Context } from 'aws-lambda'
import { CreateListInput, CreateListItemInput } from 'types/graphql'

import { convertLinkToList } from 'src/lib/bard'
import { logger } from 'src/lib/logger'

// import {
//   AMAZON_PRODUCT_REGEX,
//   AMAZON_WISHLIST_REGEX,
//   fetchAmazonProductLink,
//   fetchAmazonWishlistLink,
// } from '../../lib/amazon'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

export type DigestedItem = Omit<CreateListItemInput, 'listId'>
export type DigestedList = CreateListInput & {
  listItems: DigestedItem[]
  link?: string
}
export type DigestHandler = (link: string) => Promise<DigestedList>
const digest: DigestHandler = async (link: string) => {
  // if (link.match(AMAZON_PRODUCT_REGEX)) {
  //   return await fetchAmazonProductLink(link)
  // }
  // if (link.match(AMAZON_WISHLIST_REGEX)) {
  //   return await fetchAmazonWishlistLink(link)
  // }

  const listItems: DigestedItem[] = []

  const text = await convertLinkToList(link)

  const list: DigestedList = {
    listItems,
    name: "Bard's list",
    type: 'WISHLIST',
    link: text,
  }

  return list
}
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: digestLink function`)
  const { link } = event.queryStringParameters

  if (!link) {
    throw new Error('Link is required')
  }

  const data = await digest(decodeURIComponent(link))

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}
