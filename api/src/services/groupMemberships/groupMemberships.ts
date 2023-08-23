import type {
  QueryResolvers,
  MutationResolvers,
  GroupMembershipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const groupMemberships: QueryResolvers['groupMemberships'] = () => {
  return db.groupMembership.findMany()
}

export const groupMembership: QueryResolvers['groupMembership'] = ({ id }) => {
  return db.groupMembership.findUnique({
    where: { id },
  })
}

export const createGroupMembership: MutationResolvers['createGroupMembership'] =
  ({ input }) => {
    return db.groupMembership.create({
      data: input,
    })
  }

export const updateGroupMembership: MutationResolvers['updateGroupMembership'] =
  ({ id, input }) => {
    return db.groupMembership.update({
      data: input,
      where: { id },
    })
  }

export const deleteGroupMembership: MutationResolvers['deleteGroupMembership'] =
  ({ id }) => {
    return db.groupMembership.delete({
      where: { id },
    })
  }

export const GroupMembership: GroupMembershipRelationResolvers = {
  user: (_obj, { root }) => {
    return db.groupMembership.findUnique({ where: { id: root?.id } }).user()
  },
  group: (_obj, { root }) => {
    return db.groupMembership.findUnique({ where: { id: root?.id } }).group()
  },
}
