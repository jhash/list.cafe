import { MetaTags } from '@redwoodjs/web'

import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

import { ListCellProps } from '../ListCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'
import { ListTypeBadge } from '../Lists/Lists'

const PublicList: React.FC<
  Omit<ListCellProps, 'canSave' | 'canDelete' | 'onSave'>
> = ({ list: { description, name, id, type } }) => {
  return (
    <>
      <MetaTags title={name} description={description} />

      <HomeContainerLayout>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-5 font-serif text-3xl leading-snug sm:text-5xl sm:leading-snug">
            {name}
            {!!id && <ListTypeBadge type={type} />}
          </div>
          {!!description && (
            <p className="font-sans text-lg sm:text-xl">{description}</p>
          )}
        </div>
        <ul className="flex flex-col gap-2">
          <ListItemsCell
            listId={id}
            dashboard={false}
            // TODO: why does the cell make these required?
            deleteItem={undefined}
          />
        </ul>
        <ListFadeOut />
      </HomeContainerLayout>
    </>
  )
}

export default PublicList
