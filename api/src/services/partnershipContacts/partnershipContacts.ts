import type {
  QueryResolvers,
  MutationResolvers,
  PartnershipContactRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const partnershipContacts: QueryResolvers['partnershipContacts'] =
  () => {
    return db.partnershipContact.findMany()
  }

export const partnershipContact: QueryResolvers['partnershipContact'] = ({
  id,
}) => {
  return db.partnershipContact.findUnique({
    where: { id },
  })
}

export const createPartnershipContact: MutationResolvers['createPartnershipContact'] =
  ({ input }) => {
    return db.partnershipContact.create({
      data: input,
    })
  }

export const updatePartnershipContact: MutationResolvers['updatePartnershipContact'] =
  ({ id, input }) => {
    return db.partnershipContact.update({
      data: input,
      where: { id },
    })
  }

export const deletePartnershipContact: MutationResolvers['deletePartnershipContact'] =
  ({ id }) => {
    return db.partnershipContact.delete({
      where: { id },
    })
  }

export const PartnershipContact: PartnershipContactRelationResolvers = {
  person: (_obj, { root }) => {
    return db.partnershipContact
      .findUnique({ where: { id: root?.id } })
      .person()
  },
  partnership: (_obj, { root }) => {
    return db.partnershipContact
      .findUnique({ where: { id: root?.id } })
      .partnership()
  },
  addedByUser: (_obj, { root }) => {
    return db.partnershipContact
      .findUnique({ where: { id: root?.id } })
      .addedByUser()
  },
}
