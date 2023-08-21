import type {
  QueryResolvers,
  MutationResolvers,
  ListMembershipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const listMemberships: QueryResolvers['listMemberships'] = () => {
  return db.listMembership.findMany()
}

export const listMembership: QueryResolvers['listMembership'] = ({ id }) => {
  return db.listMembership.findUnique({
    where: { id },
  })
}

export const createListMembership: MutationResolvers['createListMembership'] =
  ({ input }) => {
    return db.listMembership.create({
      data: input,
    })
  }

export const updateListMembership: MutationResolvers['updateListMembership'] =
  ({ id, input }) => {
    return db.listMembership.update({
      data: input,
      where: { id },
    })
  }

export const deleteListMembership: MutationResolvers['deleteListMembership'] =
  ({ id }) => {
    return db.listMembership.delete({
      where: { id },
    })
  }

export const ListMembership: ListMembershipRelationResolvers = {
  list: (_obj, { root }) => {
    return db.listMembership.findUnique({ where: { id: root?.id } }).list()
  },
  user: (_obj, { root }) => {
    return db.listMembership.findUnique({ where: { id: root?.id } }).user()
  },
}
