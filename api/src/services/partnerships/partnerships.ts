import type {
  QueryResolvers,
  MutationResolvers,
  PartnershipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const partnerships: QueryResolvers['partnerships'] = () => {
  return db.partnership.findMany()
}

export const partnership: QueryResolvers['partnership'] = ({ id }) => {
  return db.partnership.findUnique({
    where: { id },
  })
}

export const createPartnership: MutationResolvers['createPartnership'] = ({
  input,
}) => {
  return db.partnership.create({
    data: input,
  })
}

export const updatePartnership: MutationResolvers['updatePartnership'] = ({
  id,
  input,
}) => {
  return db.partnership.update({
    data: input,
    where: { id },
  })
}

export const deletePartnership: MutationResolvers['deletePartnership'] = ({
  id,
}) => {
  return db.partnership.delete({
    where: { id },
  })
}

export const Partnership: PartnershipRelationResolvers = {
  partnershipContacts: (_obj, { root }) => {
    return db.partnership
      .findUnique({ where: { id: root?.id } })
      .partnershipContacts()
  },
}
