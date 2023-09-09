import { Pencil, Share } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

import CopyListCafeLink from '../CopyListCafeLink/CopyListCafeLink'
import { ListCellProps } from '../ListCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'
import { ListTypeBadge } from '../Lists/Lists'
import PersonAvatar from '../PersonAvatar/PersonAvatar'
import SectionTitle from '../SectionTitle/SectionTitle'

const PublicList: React.FC<
  Omit<ListCellProps, 'canSave' | 'canDelete' | 'onSave'>
> = ({
  list: { description, name, id, type, listRoles, owners, identifier },
}) => {
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
                {!!identifier && (
                  <CopyListCafeLink
                    path={routes.identifier({ identifier: identifier.id })}
                  >
                    <div className="btn btn-secondary ml-auto flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0">
                      <Share size="1.25rem" />
                    </div>
                  </CopyListCafeLink>
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
        {!!owners.length && (
          <div className="flex flex-col gap-3">
            <SectionTitle>{'Listed by'}</SectionTitle>
            {owners.map((owner, index) => (
              <Link
                key={index}
                className="min-h-12 flex items-center gap-3 overflow-hidden overflow-ellipsis rounded-lg border px-3 py-1 shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
                to={routes.identifier({ identifier: owner.identifier?.id })}
              >
                <PersonAvatar
                  person={owner}
                  className="h-8 w-8 text-[0.375rem]"
                />
                {!!owner.name && (
                  <div className="flex-shrink whitespace-normal">
                    {owner.name}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
        <ListFadeOut />
      </HomeContainerLayout>
    </>
  )
}

export default PublicList
