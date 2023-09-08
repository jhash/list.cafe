import { HTMLProps, useState } from 'react'

import axios from 'axios'
import { CreateImageInput } from 'types/graphql'

import Loading from 'src/components/Loading'
import { api } from 'src/lib/api'
type UploadImagesProps = HTMLProps<HTMLInputElement> & {
  onUpload: (images: CreateImageInput[]) => void
}
const UploadImages = ({ onUpload, ...rest }: UploadImagesProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  async function onChange({ target: { validity, files } }) {
    if (validity.valid) {
      setLoading(true)

      const images: CreateImageInput[] = []

      for (const file of files as FileList) {
        const { data } = await api.post('/getImageUploadUrl', {
          name: file.name,
        })

        const { signedUrl, url } = data

        await axios.put(signedUrl, file, {
          headers: { 'Content-Type': 'application/octet-stream' },
        })

        images.push({
          url,
          alt: file.name,
        })
      }

      setLoading(false)
      onUpload(images)
    }
  }

  return (
    <div className="flex w-full max-w-xl flex-col">
      {loading ? (
        <Loading />
      ) : (
        <input
          {...rest}
          type="file"
          onChange={onChange}
          multiple
          className="cursor-pointer"
        />
      )}
    </div>
  )
}

export default UploadImages
