import type {
  QueryResolvers,
  MutationResolvers,
  GroupRelationResolvers,
  GroupRole,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const validateUserCanEditGroup: QueryResolvers['group'] = ({ id }) => {
  return db.group.findUniqueOrThrow({
    where: {
      id,
      OR: [...groupMembershipsWhereClauses(['ADMIN', 'OWNER', 'EDIT'])],
    },
  })
}

export const groupMembershipsWhereClauses = (groupRoles?: GroupRole[]) => {
  return [
    {
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
  ]
}

export const adminGroups: QueryResolvers['groups'] = () => {
  return db.group.findMany()
}

export const publicGroups: QueryResolvers['publicGroups'] = ({
  take,
  skip,
  personId,
}) => {
  return db.group.findMany({
    where: {
      visibility: 'PUBLIC',
      groupMemberships: personId
        ? {
            some: {
              groupRole: 'OWNER',
              user: {
                person: {
                  id: personId,
                },
              },
            },
          }
        : undefined,
    },
    take,
    skip,
  })
}

export const groups: QueryResolvers['groups'] = () => {
  if (!context.currentUser) {
    return db.group.findMany({
      where: {
        visibility: 'PUBLIC',
      },
    })
  }

  return db.group.findMany({
    where: {
      OR: [...groupMembershipsWhereClauses()],
    },
  })
}

export const group: QueryResolvers['group'] = ({ id }) => {
  if (!context.currentUser) {
    return db.group.findUnique({
      where: {
        id,
        OR: [{ visibility: 'PUBLIC' }, { visibility: 'LINK' }],
      },
    })
  }

  return db.group.findUnique({
    where: {
      id,
      OR: [
        { visibility: 'PUBLIC' },
        { visibility: 'LINK' },
        ...groupMembershipsWhereClauses(),
      ],
    },
  })
}

export const createGroup: MutationResolvers['createGroup'] = ({ input }) => {
  return db.group.create({
    data: {
      ...input,
      identifier: {
        create: {
          id: input.identifier?.id,
        },
      },
      groupMemberships: {
        create: {
          user: {
            connect: {
              id: context.currentUser?.id,
            },
          },
          groupRole: 'OWNER',
        },
      },
    },
  })
}

export const updateGroup: MutationResolvers['updateGroup'] = ({
  id,
  input,
}) => {
  return db.group.update({
    data: {
      ...input,
      identifier: {
        upsert: {
          where: {
            groupId: id,
          },
          update: {
            id: input.identifier?.id,
          },
          create: {
            id: input.identifier?.id,
          },
        },
      },
    },
    where: {
      id,
      OR: [...groupMembershipsWhereClauses(['ADMIN', 'EDIT', 'OWNER'])],
    },
  })
}

export const deleteGroup: MutationResolvers['deleteGroup'] = ({ id }) => {
  return db.group.delete({
    where: {
      id,
      OR: [...groupMembershipsWhereClauses(['OWNER'])],
    },
  })
}

export const Group: GroupRelationResolvers = {
  identifier: (_obj, { root }) => {
    return db.group.findUnique({ where: { id: root?.id } }).identifier()
  },
  groupRoles: async (_obj, { root }) => {
    return (
      await db.group.findUnique({ where: { id: root?.id } }).groupMemberships({
        where: {
          userId: context.currentUser?.id,
        },
      })
    ).map((membership) => membership.groupRole)
  },
}
