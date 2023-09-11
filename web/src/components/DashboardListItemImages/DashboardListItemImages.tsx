import { Trash2 } from 'lucide-react'
import { ListItemsQuery } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { LIST_ITEM_IMAGES_QUERY } from '../DashboardListItem/DashboardListItem'

export const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`

interface DashboardListItemImagesProps {
  images: ListItemsQuery['listItems'][number]['images']
  editing?: boolean
}
const DashboardListItemImages = ({
  images,
  editing,
}: DashboardListItemImagesProps) => {
  const [deleteImageMutation, { loading }] = useMutation(
    DELETE_IMAGE_MUTATION,
    { refetchQueries: [LIST_ITEM_IMAGES_QUERY], awaitRefetchQueries: true }
  )

  return (
    <div className="flex items-center gap-2">
      {images.map(({ url, alt, id }, index) => (
        <div
          key={index}
          className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-sm border p-2"
        >
          {!!editing && (
            <button
              className="btn btn-error absolute right-1 top-1 flex h-8 min-h-0 w-8 flex-grow-0 items-center justify-center rounded-full p-0"
              title="Delete"
              type="button"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()

                return (
                  window?.confirm(
                    'Are you sure you want to delete this image?'
                  ) && deleteImageMutation({ variables: { id } })
                )
              }}
              disabled={loading}
            >
              <Trash2 size="1rem" />
            </button>
          )}
          <img src={url} alt={alt} className="w-full" />
        </div>
      ))}
    </div>
  )
}

export default DashboardListItemImages
