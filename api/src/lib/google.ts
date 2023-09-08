import { Storage } from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload-ts'

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
      ? process.env.NODE_ENV === 'development'
        ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
        : process.env.GCP_PRIVATE_KEY
      : '',
  },
})

export const bucket = storage.bucket(process.env.GCP_BUCKET_ID || '')

export const uploadFromMemoryToGoogleCloud = async (
  fileName: string,
  contents: string | Buffer
) => {
  await bucket.file(fileName).save(contents)
}
export const uploadToGoogleCloud = (
  createReadStream: FileUpload['createReadStream'],
  filename: string
): Promise<void> => {
  // step 1 - upload the file to Google Cloud Storage
  return new Promise((resolves, rejects) =>
    createReadStream()
      .pipe(
        bucket.file(filename).createWriteStream({
          resumable: false,
          gzip: true,
        })
      )
      .on('error', (err) => rejects(err)) // reject on error
      .on('finish', resolves)
  ) // resolve on finish
}
