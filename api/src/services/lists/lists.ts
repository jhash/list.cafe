import type {
  QueryResolvers,
  MutationResolvers,
  ListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const adminLists: QueryResolvers['lists'] = () => {
  return db.list.findMany()
}

const listMembershipsWhereClauses = () => {
  return [
    {
      listMemberships: {
        some: {
          userId: context.currentUser.id,
        },
      },
    },
    {
      listGroupMemberships: {
        some: {
          group: {
            groupMemberships: {
              some: {
                userId: context.currentUser.id,
              },
            },
          },
        },
      },
    },
  ]
}

export const lists: QueryResolvers['lists'] = () => {
  if (!context.currentUser) {
    return db.list.findMany({
      where: {
        visibility: 'PUBLIC',
      },
    })
  }

  return db.list.findMany({
    where: {
      OR: [...listMembershipsWhereClauses()],
    },
  })
}

export const list: QueryResolvers['list'] = ({ id }) => {
  if (!context.currentUser) {
    return db.list.findUniqueOrThrow({
      where: {
        id,
        OR: [{ visibility: 'PUBLIC' }, { visibility: 'LINK' }],
      },
    })
  }

  return db.list.findUnique({
    where: {
      id,
      OR: [
        { visibility: 'PUBLIC' },
        { visibility: 'LINK' },
        ...listMembershipsWhereClauses(),
      ],
    },
  })
}

export const createList: MutationResolvers['createList'] = ({ input }) => {
  return db.list.create({
    data: {
      ...input,
      identifier: {
        create: input.identifier,
      },
      listMemberships: {
        create: {
          user: {
            connect: {
              id: context.currentUser?.id,
            },
          },
          listRole: 'OWNER',
        },
      },
    },
  })
}

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  return db.list.update({
    data: {
      ...input,
      identifier: {
        upsert: {
          where: {
            listId: id,
          },
          update: input.identifier,
          create: input.identifier,
        },
      },
    },
    where: { id },
  })
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  return db.list.delete({
    where: {
      id,
      OR: [
        {
          listMemberships: {
            some: {
              userId: context.currentUser.id,
              listRole: {
                in: ['OWNER'],
              },
            },
          },
        },
        {
          listGroupMemberships: {
            some: {
              group: {
                groupMemberships: {
                  some: {
                    userId: context.currentUser.id,
                    groupRole: {
                      // TODO: should admin be able to delete?
                      in: ['OWNER', 'ADMIN'],
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  })
}

export const List: ListRelationResolvers = {
  identifier: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).identifier()
  },
  listItems: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).listItems()
  },
  listRoles: async (_obj, { root }) => {
    return (
      await db.list.findUnique({ where: { id: root?.id } }).listMemberships({
        where: {
          userId: context.currentUser.id,
        },
      })
    ).map((membership) => membership.listRole)
  },
}
