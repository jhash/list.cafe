import type {
  QueryResolvers,
  MutationResolvers,
  ListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const adminLists: QueryResolvers['lists'] = () => {
  return db.list.findMany()
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
      OR: [
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
      ],
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
      ],
    },
  })
}

export const createList: MutationResolvers['createList'] = ({ input }) => {
  // TODO: delete identifiers
  return db.list.create({
    data: {
      ...input,
      identifier: {
        create: input.identifier,
      },
    },
  })
}

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  // TODO: delete identifiers
  return db.list.update({
    data: {
      ...input,
      identifier: {
        create: input.identifier,
      },
    },
    where: { id },
  })
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  // TODO: delete identifiers
  return db.list.delete({
    where: { id },
  })
}

export const List: ListRelationResolvers = {
  identifier: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).identifier()
  },
  listItems: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).listItems()
  },
}
