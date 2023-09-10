import { useEffect, useMemo, useState } from 'react'

import { CreateListItemInput, ListItemsQuery } from 'types/graphql'

import { MetaTags } from '@redwoodjs/web'

import {
  listGroupRolesIntersect,
  listRolesIntersect,
} from 'src/layouts/DashboardListLayout/DashboardListLayout'

import { AddItemButton } from '../AddItemButton/AddItemButton'
import DashboardListItem from '../DashboardListItem/DashboardListItem'
import { ListCellChild } from '../ListCell'
import ListItemsCell from '../ListItemsCell'
import Modal from '../Modal/Modal'
import SectionTitle from '../SectionTitle/SectionTitle'

const EditListItems: ListCellChild = ({
  list: { id, name, description, listRoles, type, groupListRoles, groupRoles },
  items,
  addItem,
  deleteItem,
}) => {
  const canAdd = useMemo(
    () =>
      !id ||
      listRolesIntersect(listRoles, ['EDIT', 'OWNER', 'ADMIN', 'CONTRIBUTE']) ||
      listGroupRolesIntersect(
        groupListRoles,
        ['EDIT', 'OWNER', 'ADMIN', 'CONTRIBUTE'],
        groupRoles,
        ['ADMIN', 'EDIT', 'OWNER']
      ),
    [listRoles, groupListRoles, groupRoles, id]
  )

  const [listItem, setListItem] = useState<
    Partial<ListItemsQuery['listItems'][number]> | undefined
  >()
  const resetListItem = () => {
    setListItem(undefined)
  }
  const createNewListItem = () => {
    setListItem({
      title: '',
      description: '',
      listId: id,
      url: '',
      quantity: 1,
      list: {
        // TODO: this should be the current value ? or separate screens
        type,
      },
      __typename: 'ListItem',
    })
  }

  const loading = false

  const onAddItem = (input: CreateListItemInput) => {
    if (!id) {
      addItem(input)
    }
    resetListItem()
  }

  useEffect(() => {
    resetListItem()
  }, [items])

  return (
    <>
      {/* TODO: move up */}
      <MetaTags
        title={name || 'Create a new list'}
        description={description || 'Create a new list'}
      />
      {!!listItem && (
        <Modal title="Add a new item" onClose={resetListItem} open={!!listItem}>
          <DashboardListItem
            url=""
            quantity={1}
            title=""
            listId={id}
            reservations={undefined}
            images={undefined}
            {...listItem}
            addItem={onAddItem}
            deleteItem={undefined}
            modal
          />
        </Modal>
      )}
      <div className="flex w-full max-w-full flex-col gap-5">
        <div className="flex w-full max-w-full items-center gap-3">
          <SectionTitle>Items</SectionTitle>
          {/* TODO: support without having saved? */}
          {canAdd && (
            <div className="flex items-center gap-3">
              <AddItemButton onClick={createNewListItem} disabled={loading} />
            </div>
          )}
        </div>
        <ul className="flex w-full max-w-full flex-col gap-2">
          {id ? (
            <ListItemsCell listId={id} dashboard deleteItem={deleteItem} />
          ) : (
            (items || []).map((listItem, index) => (
              <li key={index} className="flex w-full max-w-full items-center">
                <DashboardListItem
                  {...listItem}
                  reservations={undefined}
                  modal={false}
                  index={index}
                  deleteItem={deleteItem}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  )
}

export default EditListItems
