import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  if (context.currentUser?.id !== id && !hasRole(['ADMIN', 'SUPPORT'])) {
    throw new Error(`Users can't directly access other users`)
  }

  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  const { hashedPassword, salt, person } = input
  const {
    description,
    pronouns,
    name,
    defaultAddressId,
    identifier,
    visibility,
  } = person || {}

  const email = input.email || person.email

  return db.user.create({
    data: {
      email,
      hashedPassword,
      salt,
      userRoles: {
        create: {},
      },
      person: {
        connectOrCreate: {
          where: {
            email: input.email,
          },
          create: {
            name,
            description,
            pronouns,
            email,
            defaultAddressId,
            visibility,
            identifier: identifier?.id
              ? {
                  create: identifier,
                }
              : undefined,
            images: person.images
              ? {
                  createMany: {
                    data: person.images,
                  },
                }
              : undefined,
          },
        },
      },
    },
    include: {
      person: true,
    },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  if (context.currentUser?.id !== id && !hasRole(['ADMIN', 'SUPPORT'])) {
    throw new Error(`Users can't update other users`)
  }

  const { hashedPassword, salt, person } = input
  const {
    description,
    pronouns,
    name,
    defaultAddressId,
    identifier,
    visibility,
  } = person || {}

  const email = input.email || person.email

  return db.user.update({
    data: {
      email,
      hashedPassword,
      salt,
      person: {
        update: {
          where: {
            user: {
              id,
            },
          },
          data: {
            name,
            description,
            pronouns,
            email,
            defaultAddressId,
            visibility,
            identifier: identifier?.id
              ? {
                  upsert: {
                    where: {
                      person: {
                        user: {
                          id,
                        },
                      },
                    },
                    update: identifier,
                    create: identifier,
                  },
                }
              : undefined,
            images: person.images
              ? {
                  createMany: {
                    data: person.images,
                  },
                }
              : undefined,
          },
        },
      },
    },
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  if (context.currentUser?.id !== id && !hasRole(['ADMIN', 'SUPPORT'])) {
    throw new Error(`Users can't delete other users`)
  }

  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  person: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).person()
  },
  // userRoles: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).userRoles()
  // },
  // groupMemberships: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).groupMemberships()
  // },
  // listMemberships: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).listMemberships()
  // },
  // partnershipStatusChanges: (_obj, { root }) => {
  //   return db.user
  //     .findUnique({ where: { id: root?.id } })
  //     .partnershipStatusChanges()
  // },
  // partnershipContactsAdded: (_obj, { root }) => {
  //   return db.user
  //     .findUnique({ where: { id: root?.id } })
  //     .partnershipContactsAdded()
  // },
  // listViews: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).listViews()
  // },
  reservations: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).reservations()
  },
  // giftPreferencesAdded: (_obj, { root }) => {
  //   return db.user
  //     .findUnique({ where: { id: root?.id } })
  //     .giftPreferencesAdded()
  // },
  // listItemTags: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).listItemTags()
  // },
  // listTags: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).listTags()
  // },
  // peopleCreated: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).peopleCreated()
  // },
}
