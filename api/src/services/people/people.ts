import type {
  QueryResolvers,
  MutationResolvers,
  PersonRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const people: QueryResolvers['people'] = ({ groupId }) => {
  // TODO: groups, connections
  return db.person.findMany({
    where: {
      visibility: {
        in: ['PUBLIC'],
      },
      user: groupId
        ? {
            groupMemberships: {
              some: {
                groupId,
              },
            },
          }
        : undefined,
    },
  })
}

export const person: QueryResolvers['person'] = ({ id }) => {
  // TODO: groups, connections
  return db.person.findUnique({
    where: {
      id,
      ...(context.currentUser?.person?.id === id
        ? {}
        : {
            visibility: {
              in: ['PUBLIC'],
            },
          }),
    },
  })
}

export const createPerson: MutationResolvers['createPerson'] = ({ input }) => {
  const { name, email } = input
  return db.person.create({
    data: {
      name,
      email,
    },
  })
}

export const updatePerson: MutationResolvers['updatePerson'] = ({
  id,
  input,
}) => {
  const { name, email } = input

  return db.person.update({
    data: { name, email },
    where: { id },
  })
}

export const deletePerson: MutationResolvers['deletePerson'] = ({ id }) => {
  return db.person.delete({
    where: { id },
  })
}

export const Person: PersonRelationResolvers = {
  user: (_obj, { root }) => {
    return db.person.findUnique({ where: { id: root?.id } }).user()
  },
  addresses: (_obj, { root }) => {
    return db.person.findUnique({ where: { id: root?.id } }).addresses()
  },
  // giftPreferences: (_obj, { root }) => {
  //   return db.person.findUnique({ where: { id: root?.id } }).giftPreferences()
  // },
  images: (_obj, { root }) => {
    return db.person.findUnique({ where: { id: root?.id } }).images()
  },
  createdByUser: (_obj, { root }) => {
    return db.person.findUnique({ where: { id: root?.id } }).createdByUser()
  },
  identifier: (_obj, { root }) => {
    return db.person.findUnique({ where: { id: root?.id } }).identifier()
  },
}
