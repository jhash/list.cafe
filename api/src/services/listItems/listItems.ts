import type {
  QueryResolvers,
  MutationResolvers,
  ListItemRelationResolvers,
  ResolversParentTypes,
} from 'types/graphql'

import { db } from 'src/lib/db'

import {
  List,
  listMembershipsWhereClauses,
  validateUserCanContributeToList,
} from '../lists/lists'

export const listItems: QueryResolvers['listItems'] = ({ listId }) => {
  return db.listItem.findMany({
    where: {
      listId,
    },
    orderBy: [
      {
        order: 'asc',
      },
      {
        title: 'asc',
      },
    ],
  })
}

export const listItem: QueryResolvers['listItem'] = ({ id }) => {
  return db.listItem.findUnique({
    where: { id },
  })
}

export const createListItem: MutationResolvers['createListItem'] = async ({
  input,
}) => {
  if (!input.listId) {
    throw new Error('List is required to create a list item')
  }

  // TODO: move to directive?
  // Should throw if user doesn't have contribute access
  await validateUserCanContributeToList({ id: input.listId })

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

export const updateListItem: MutationResolvers['updateListItem'] = async ({
  id,
  input,
}) => {
  return db.listItem.update({
    data: input,
    where: {
      id,
      list: {
        OR: [
          ...listMembershipsWhereClauses(
            ['ADMIN', 'CONTRIBUTE', 'OWNER', 'EDIT'],
            ['OWNER', 'ADMIN', 'EDIT']
          ),
        ],
      },
    },
  })
}

export const deleteListItem: MutationResolvers['deleteListItem'] = async ({
  id,
}) => {
  return db.listItem.delete({
    where: {
      id,
      list: {
        OR: [
          ...listMembershipsWhereClauses(
            ['ADMIN', 'CONTRIBUTE', 'OWNER', 'EDIT'],
            ['OWNER', 'ADMIN', 'EDIT']
          ),
        ],
      },
    },
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
