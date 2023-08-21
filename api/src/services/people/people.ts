import type {
  QueryResolvers,
  MutationResolvers,
  PersonRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const people: QueryResolvers['people'] = () => {
  return db.person.findMany()
}

export const person: QueryResolvers['person'] = ({ id }) => {
  return db.person.findUnique({
    where: { id },
  })
}

export const createPerson: MutationResolvers['createPerson'] = ({ input }) => {
  return db.person.create({
    data: input,
  })
}

export const updatePerson: MutationResolvers['updatePerson'] = ({
  id,
  input,
}) => {
  return db.person.update({
    data: input,
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
  partnershipContact: (_obj, { root }) => {
    return db.person
      .findUnique({ where: { id: root?.id } })
      .partnershipContact()
  },
  giftPreferences: (_obj, { root }) => {
    return db.person.findUnique({ where: { id: root?.id } }).giftPreferences()
  },
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
