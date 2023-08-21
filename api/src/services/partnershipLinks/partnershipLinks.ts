import type {
  QueryResolvers,
  MutationResolvers,
  PartnershipLinkRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const partnershipLinks: QueryResolvers['partnershipLinks'] = () => {
  return db.partnershipLink.findMany()
}

export const partnershipLink: QueryResolvers['partnershipLink'] = ({ id }) => {
  return db.partnershipLink.findUnique({
    where: { id },
  })
}

export const createPartnershipLink: MutationResolvers['createPartnershipLink'] =
  ({ input }) => {
    return db.partnershipLink.create({
      data: input,
    })
  }

export const updatePartnershipLink: MutationResolvers['updatePartnershipLink'] =
  ({ id, input }) => {
    return db.partnershipLink.update({
      data: input,
      where: { id },
    })
  }

export const deletePartnershipLink: MutationResolvers['deletePartnershipLink'] =
  ({ id }) => {
    return db.partnershipLink.delete({
      where: { id },
    })
  }

export const PartnershipLink: PartnershipLinkRelationResolvers = {
  partnership: (_obj, { root }) => {
    return db.partnershipLink
      .findUnique({ where: { id: root?.id } })
      .partnership()
  },
  listItem: (_obj, { root }) => {
    return db.partnershipLink.findUnique({ where: { id: root?.id } }).listItem()
  },
  createdByUser: (_obj, { root }) => {
    return db.partnershipLink
      .findUnique({ where: { id: root?.id } })
      .createdByUser()
  },
  partnershipLinkStatusChanges: (_obj, { root }) => {
    return db.partnershipLink
      .findUnique({ where: { id: root?.id } })
      .partnershipLinkStatusChanges()
  },
}
