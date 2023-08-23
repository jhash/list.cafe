import type {
  QueryResolvers,
  MutationResolvers,
  ListGroupMembershipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const listGroupMemberships: QueryResolvers['listGroupMemberships'] =
  () => {
    return db.listGroupMembership.findMany()
  }

export const listGroupMembership: QueryResolvers['listGroupMembership'] = ({
  id,
}) => {
  return db.listGroupMembership.findUnique({
    where: { id },
  })
}

export const createListGroupMembership: MutationResolvers['createListGroupMembership'] =
  ({ input }) => {
    return db.listGroupMembership.create({
      data: input,
    })
  }

export const updateListGroupMembership: MutationResolvers['updateListGroupMembership'] =
  ({ id, input }) => {
    return db.listGroupMembership.update({
      data: input,
      where: { id },
    })
  }

export const deleteListGroupMembership: MutationResolvers['deleteListGroupMembership'] =
  ({ id }) => {
    return db.listGroupMembership.delete({
      where: { id },
    })
  }

export const ListGroupMembership: ListGroupMembershipRelationResolvers = {
  list: (_obj, { root }) => {
    return db.listGroupMembership.findUnique({ where: { id: root?.id } }).list()
  },
  group: (_obj, { root }) => {
    return db.listGroupMembership
      .findUnique({ where: { id: root?.id } })
      .group()
  },
}
