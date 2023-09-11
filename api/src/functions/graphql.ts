// import { GraphQLError } from 'graphql'
// import { GraphQLUpload as Upload } from 'graphql-upload-ts'

import { authDecoder } from '@redwoodjs/auth-dbauth-api'
import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
// import { FileArgs, checkFileSize, generateUniqueFilename } from 'src/lib/files'
// import { uploadToGoogleCloud } from 'src/lib/google'
import { logger } from 'src/lib/logger'

const graphqlHandler = createGraphQLHandler({
  authDecoder,
  getCurrentUser,
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  // schemaOptions: {
  //   resolvers: {
  //     Upload,
  //     Mutation: {
  //       uploadImages: async (_parent, args: FileArgs[]) => {
  //         // the file uploaded is a promise, so await to get the contents
  //         const { filename, mimetype, createReadStream } = await args[0].file

  //         if (!mimetype.startsWith('image/')) {
  //           throw new GraphQLError('File is not an image')
  //         }

  //         // first check file size before proceeding
  //         try {
  //           const oneGb = 1000000000
  //           await checkFileSize(createReadStream, oneGb)
  //         } catch (error) {
  //           if (typeof error === 'number') {
  //             throw new UserInputError('Maximum file size is 1GB')
  //           }
  //         }

  //         // generate a scrubbed unique filename
  //         const uniqueFilename = `images/${generateUniqueFilename(filename)}`

  //         // upload to Google Cloud Storage
  //         try {
  //           await uploadToGoogleCloud(createReadStream, uniqueFilename)

  //           return `https://storage.googleapis.com/${process.env.GCP_BUCKET_ID}/${uniqueFilename}`
  //         } catch (error) {
  //           throw new UserInputError('Error with uploading to Google Cloud')
  //         }
  //       },
  //     },
  //   },
  // },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})

export const handler = (req, context) => {
  logger.warn(
    '${event.httpMethod} ${event.path} req before: ',
    JSON.stringify(req, null, 2)
  )
  // logger.warn(
  //   '${event.httpMethod} ${event.path} req.body before: ',
  //   JSON.stringify(req.body)
  // )
  // req.body = req.isBase64Encoded
  //   ? Buffer.from(req.body, 'base64').toString('utf-8')
  //   : req.body

  // logger.warn(
  //   '${event.httpMethod} ${event.path} req.body after: ',
  //   JSON.stringify(req.body)
  // )

  return graphqlHandler(req, context)
}
