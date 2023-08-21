import type {
  QueryResolvers,
  MutationResolvers,
  IdentifierRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const identifiers: QueryResolvers['identifiers'] = () => {
  return db.identifier.findMany()
}

export const identifier: QueryResolvers['identifier'] = ({ id }) => {
  return db.identifier.findUniqueOrThrow({
    where: { id },
    include: {
      person: true,
      group: true,
      list: true,
    },
  })
}

export const createIdentifier: MutationResolvers['createIdentifier'] = ({
  input,
}) => {
  return db.identifier.create({
    data: input,
  })
}

export const updateIdentifier: MutationResolvers['updateIdentifier'] = ({
  id,
  input,
}) => {
  return db.identifier.update({
    data: input,
    where: { id },
  })
}

export const deleteIdentifier: MutationResolvers['deleteIdentifier'] = ({
  id,
}) => {
  return db.identifier.delete({
    where: { id },
  })
}

export const Identifier: IdentifierRelationResolvers = {
  person: (_obj, { root }) => {
    return db.identifier.findUnique({ where: { id: root?.id } }).person()
  },
  list: (_obj, { root }) => {
    return db.identifier.findUnique({ where: { id: root?.id } }).list()
  },
  group: (_obj, { root }) => {
    return db.identifier.findUnique({ where: { id: root?.id } }).group()
  },
}
