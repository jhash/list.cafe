import type {
  QueryResolvers,
  MutationResolvers,
  ListMembershipRelationResolvers,
} from 'types/graphql'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const listMembershipsByListId: QueryResolvers['listMembershipsByListId'] =
  ({ listId }) => {
    return db.listMembership.findMany({ where: { listId } })
  }

export const listMemberships: QueryResolvers['listMemberships'] = () => {
  // TODO: add this all over
  if (!hasRole(['ADMIN', 'SUPPORT'])) {
    throw new Error('You are not authorized to access this')
  }
  return db.listMembership.findMany()
}

export const listMembership: QueryResolvers['listMembership'] = ({ id }) => {
  return db.listMembership.findUnique({
    where: { id },
  })
}

export const createListMembership: MutationResolvers['createListMembership'] =
  ({ input }) => {
    if (!input.email && !input.userId) {
      throw new Error('Either an email or a user id is required')
    }

    return db.listMembership.create({
      data: {
        list: {
          connect: {
            id: input.listId,
          },
        },
        listRole: input.listRole,
        user: {
          connectOrCreate: {
            where: input.userId
              ? {
                  id: input.userId,
                }
              : {
                  email: input.email,
                },
            create: {
              email: input.email,
              person: {
                connectOrCreate: {
                  where: {
                    email: input.email,
                  },
                  create: {
                    email: input.email,
                    name: input.name,
                  },
                },
              },
            },
          },
        },
      },
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
