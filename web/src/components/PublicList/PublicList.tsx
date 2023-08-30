import { MetaTags } from '@redwoodjs/web'

import { ListCellProps } from '../ListCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'

const PublicList: React.FC<
  Omit<ListCellProps, 'canSave' | 'canDelete' | 'onSave'>
> = ({ list: { description, name, id } }) => {
  return (
    <>
      <MetaTags title={name} description={description} />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="container flex flex-col gap-12">
          <div className="flex flex-col gap-7">
            <div className="flex font-serif text-5xl leading-tight">{name}</div>
            {!!description && (
              <p className="font-sans text-xl">{description}</p>
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
        </div>
      </div>
    </>
  )
}

export default PublicList
