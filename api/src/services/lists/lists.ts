import type {
  QueryResolvers,
  MutationResolvers,
  ListRelationResolvers,
  ListRole,
  GroupRole,
  CreateListInput,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { createListItem } from '../listItems/listItems'

export const adminLists: QueryResolvers['lists'] = () => {
  return db.list.findMany()
}

export const listMembershipsWhereClauses = (
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

export const publicLists: QueryResolvers['publicLists'] = ({
  take,
  skip,
  personId,
}) => {
  return db.list.findMany({
    where: {
      visibility: 'PUBLIC',
      listMemberships: personId
        ? {
            some: {
              user: {
                person: {
                  id: personId,
                },
              },
              listRole: {
                in: ['OWNER', 'ADMIN', 'CONTRIBUTE', 'EDIT'],
              },
            },
          }
        : {},
    },
    take,
    skip,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const lists: QueryResolvers['lists'] = () => {
  return db.list.findMany({
    where: {
      OR: [...listMembershipsWhereClauses()],
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export const validateUserCanEditList: QueryResolvers['list'] = ({ id }) => {
  return db.list.findUniqueOrThrow({
    where: {
      id,
      OR: [
        ...listMembershipsWhereClauses(
          ['ADMIN', 'OWNER', 'EDIT'],
          ['OWNER', 'ADMIN', 'EDIT']
        ),
      ],
    },
  })
}

export const validateUserCanContributeToList: QueryResolvers['list'] = ({
  id,
}) => {
  return db.list.findUniqueOrThrow({
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

export const list: QueryResolvers['list'] = ({ id }) => {
  if (!context.currentUser) {
    return db.list.findUnique({
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

export const createList: MutationResolvers['createList'] = async ({
  input,
}) => {
  const listItems = input.listItems
  delete input.listItems
  const filteredInput: Omit<CreateListInput, 'listItems'> = { ...input }

  const list = await db.list.create({
    data: {
      ...filteredInput,
      identifier: {
        create: filteredInput.identifier,
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
      // listItems: {
      //   createMany: {
      //     data: (input.listItems || []).map((createListItemInput) => ({
      //       ...createListItemInput,
      //       // Prisma doesn't support nested createMany yet
      //       images: createListItemInput.images
      //         ? {
      //             createMany: {
      //               data: createListItemInput.images,
      //             },
      //           }
      //         : undefined,
      //     })),
      //   },
      // },
    },
  })

  for (const listItem of listItems) {
    await createListItem({ input: { ...listItem, listId: list.id } })
  }

  return list
}

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  // TODO: delete attached reservations if not reservable? or message attached users?
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
  owners: async (_obj, { root }) => {
    return await Promise.all(
      (
        await db.list.findUnique({ where: { id: root?.id } }).listMemberships({
          where: {
            listRole: {
              equals: 'OWNER',
            },
            user: {
              person: {
                visibility: {
                  equals: 'PUBLIC',
                },
              },
            },
          },
          include: {
            user: {
              include: {
                person: true,
              },
            },
          },
        })
      ).map((membership) => membership.user.person)
    )
  },
}
