import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  const { email, hashedPassword, salt } = input
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
            ...input.person,
          },
        },
      },
    },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
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
  // reservations: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).reservations()
  // },
  // giftPreferencesAdded: (_obj, { root }) => {
  //   return db.user
  //     .findUnique({ where: { id: root?.id } })
  //     .giftPreferencesAdded()
  // },
  // purchases: (_obj, { root }) => {
  //   return db.user.findUnique({ where: { id: root?.id } }).purchases()
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
