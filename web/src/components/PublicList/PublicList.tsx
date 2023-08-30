import { MetaTags } from '@redwoodjs/web'

import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

import { ListCellProps } from '../ListCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'

const PublicList: React.FC<
  Omit<ListCellProps, 'canSave' | 'canDelete' | 'onSave'>
> = ({ list: { description, name, id } }) => {
  return (
    <>
      <MetaTags title={name} description={description} />

      <HomeContainerLayout>
        <div className="flex flex-col gap-7">
          <div className="flex font-serif text-5xl leading-tight">{name}</div>
          {!!description && <p className="font-sans text-xl">{description}</p>}
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
