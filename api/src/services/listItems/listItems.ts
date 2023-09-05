import type {
  QueryResolvers,
  MutationResolvers,
  ListItemRelationResolvers,
  ResolversParentTypes,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { List } from '../lists/lists'

export const listItems: QueryResolvers['listItems'] = ({ listId }) => {
  return db.listItem.findMany({
    where: {
      listId,
    },
  })
}

export const listItem: QueryResolvers['listItem'] = ({ id }) => {
  return db.listItem.findUnique({
    where: { id },
  })
}

export const createListItem: MutationResolvers['createListItem'] = ({
  input,
}) => {
  if (!input.listId) {
    throw new Error('List is required to create a list item')
  }

  const {
    description,
    images,
    listId,
    order,
    price,
    quantity,
    title,
    url,
    voting,
  } = input

  return db.listItem.create({
    data: {
      description,
      order,
      price,
      quantity,
      title,
      url,
      voting,
      list: {
        connect: {
          id: listId,
        },
      },
      images: images
        ? {
            createMany: {
              data: images,
            },
          }
        : undefined,
    },
  })
}

export const updateListItem: MutationResolvers['updateListItem'] = ({
  id,
  input,
}) => {
  return db.listItem.update({
    data: input,
    where: { id },
  })
}

export const deleteListItem: MutationResolvers['deleteListItem'] = ({ id }) => {
  return db.listItem.delete({
    where: { id },
  })
}

export const ListItem: ListItemRelationResolvers = {
  list: (_obj, { root }) => {
    return db.listItem.findUnique({ where: { id: root?.id } }).list()
  },
  listRoles: (_obj, { root, ...rest }) => {
    return List.listRoles(
      {},
      {
        root: {
          id: root?.listId,
        } as ResolversParentTypes['List'],
        ...rest,
      }
    )
  },
  reservations: (_obj, { root }) => {
    return db.listItem.findUnique({ where: { id: root?.id } }).reservations()
  },
  // parent: (_obj, { root }) => {
  //   return db.listItem.findUnique({ where: { id: root?.id } }).parent()
  // },
  // children: (_obj, { root }) => {
  //   return db.listItem.findUnique({ where: { id: root?.id } }).children()
  // },
  images: (_obj, { root }) => {
    return db.listItem.findUnique({ where: { id: root?.id } }).images()
  },
}
