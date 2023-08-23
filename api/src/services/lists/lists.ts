import type {
  QueryResolvers,
  MutationResolvers,
  ListRelationResolvers,
  ListRole,
  GroupRole,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const adminLists: QueryResolvers['lists'] = () => {
  return db.list.findMany()
}

const listMembershipsWhereClauses = (
  listRoles?: ListRole[],
  groupRoles?: GroupRole[]
) => {
  return [
    {
      listMemberships: {
        some: {
          userId: context.currentUser?.id,
          ...(listRoles
            ? {
                listRole: {
                  in: listRoles,
                },
              }
            : {}),
        },
      },
    },
    {
      listGroupMemberships: {
        some: {
          ...(listRoles
            ? {
                listRole: {
                  in: listRoles,
                },
              }
            : {}),
          group: {
            groupMemberships: {
              some: {
                userId: context.currentUser?.id,
                ...(groupRoles
                  ? {
                      groupRole: {
                        in: groupRoles,
                      },
                    }
                  : {}),
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
    where: {
      id,
      OR: [
        ...listMembershipsWhereClauses(
          ['ADMIN', 'CONTRIBUTE', 'OWNER', 'EDIT'],
          ['OWNER', 'ADMIN', 'EDIT']
        ),
      ],
    },
  })
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  return db.list.delete({
    where: {
      id,
      OR: [...listMembershipsWhereClauses(['OWNER'], ['OWNER', 'ADMIN'])],
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
          userId: context.currentUser?.id,
        },
      })
    ).map((membership) => membership.listRole)
  },
}
