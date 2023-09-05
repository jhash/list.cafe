import { Buffer } from 'buffer'

import { FileUpload } from 'graphql-upload-ts'
import { v4 as uuid } from 'uuid'

export interface FileArgs {
  file: Promise<FileUpload>
}

// function to check if the size of the file is permitted
export const checkFileSize = (
  createReadStream: FileUpload['createReadStream'],
  maxSize: number
) =>
  new Promise((resolves, rejects) => {
    let filesize = 0
    const stream = createReadStream()
    stream.on('data', (chunk: Buffer) => {
      filesize += chunk.length
      if (filesize > maxSize) {
        rejects(filesize)
      }
    })
    stream.on('end', () => resolves(filesize))
    stream.on('error', rejects)
  })

export const generateUniqueFilename = (filename?: string): string => {
  // step 1 - scrub filenname to remove spaces
  const trimmedFilename = (filename || '').replace(/\s+/g, `-`)

  // step 2 - ensure filename is unique by appending a UUID
  const unique = uuid()

  // step 3 - return the unique filename
  return `${unique}-${trimmedFilename}`
}
