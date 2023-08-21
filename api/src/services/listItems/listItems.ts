import type {
  QueryResolvers,
  MutationResolvers,
  ListItemRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

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
  return db.listItem.create({
    data: input,
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
  // reservations: (_obj, { root }) => {
  //   return db.listItem.findUnique({ where: { id: root?.id } }).reservations()
  // },
  // purchases: (_obj, { root }) => {
  //   return db.listItem.findUnique({ where: { id: root?.id } }).purchases()
  // },
  // parent: (_obj, { root }) => {
  //   return db.listItem.findUnique({ where: { id: root?.id } }).parent()
  // },
  // children: (_obj, { root }) => {
  //   return db.listItem.findUnique({ where: { id: root?.id } }).children()
  // },
  // images: (_obj, { root }) => {
  //   return db.listItem.findUnique({ where: { id: root?.id } }).images()
  // },
}
