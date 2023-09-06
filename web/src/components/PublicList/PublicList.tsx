import { Pencil } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

import { ListCellProps } from '../ListCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'
import { ListTypeBadge } from '../Lists/Lists'

const PublicList: React.FC<
  Omit<ListCellProps, 'canSave' | 'canDelete' | 'onSave'>
> = ({ list: { description, name, id, type, listRoles } }) => {
  return (
    <>
      <MetaTags title={name} description={description} />

      <HomeContainerLayout>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-5 font-serif text-3xl leading-snug sm:text-5xl sm:leading-snug">
            {name}
            {!!id && (
              <div className="flex min-h-[2.58rem] flex-grow items-center gap-3 self-start sm:min-h-[4.125rem]">
                <ListTypeBadge type={type} />
                {!!listRoles?.filter((role) => role !== 'VIEW').length && (
                  <Link
                    className="btn btn-secondary ml-auto flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0"
                    to={routes.list({ id })}
                  >
                    <Pencil size="1.25rem" />
                  </Link>
                )}
              </div>
            )}
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
