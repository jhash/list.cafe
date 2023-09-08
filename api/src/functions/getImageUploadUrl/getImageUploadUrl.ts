import type { Context } from 'aws-lambda'
import isString from 'lodash/isString'

import { UserInputError } from '@redwoodjs/graphql-server'

import { generateUniqueFilename } from 'src/lib/files'
import { bucket } from 'src/lib/google'
import { logger } from 'src/lib/logger'

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

export const handler = async (event, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: uploadImages function`)

  const body = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf-8')
    : event.body

  logger.info(`${event.httpMethod} ${event.path}: uploadImages body: "${body}"`)

  if (!body) {
    throw new Error('No body included')
  }

  try {
    const { name } = (isString(body) ? JSON.parse(body) : body) as {
      name: string
    }

    // generate a scrubbed unique filename
    const uniqueFilename = `images/${generateUniqueFilename(name)}`

    logger.info(
      `${event.httpMethod} ${event.path}: uploadImages file name: ${name}, ${uniqueFilename}`
    )

    const [signedUrl] = await bucket.file(uniqueFilename).getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: 'application/octet-stream',
    })

    const url = `https://storage.googleapis.com/${process.env.GCP_BUCKET_ID}/${uniqueFilename}`

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        name,
        signedUrl,
        fileName: uniqueFilename,
      }),
    }
  } catch (error) {
    logger.error(error)
    throw new UserInputError('Error creating image upload url')
  }
}
