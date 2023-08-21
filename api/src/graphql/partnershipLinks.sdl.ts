export const schema = gql`
  type PartnershipLink {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    status: PartnershipLinkStatus!
    originalUrl: String!
    partnership: Partnership
    partnershipId: Int
    listItem: ListItem
    listItemId: Int
    createdByUser: User
    createdByUserId: Int
    # partnershipLinkStatusChanges: [PartnershipLinkStatusChange]!
  }

  enum PartnershipLinkStatus {
    PENDING
    DIGESTING
    SUCCESSFUL
    UNSUCCESSFUL
  }

  type Query {
    partnershipLinks: [PartnershipLink!]! @requireAuth
    partnershipLink(id: String!): PartnershipLink @requireAuth
  }

  input CreatePartnershipLinkInput {
    status: PartnershipLinkStatus!
    originalUrl: String!
    partnershipId: Int
    listItemId: Int
    createdByUserId: Int
  }

  input UpdatePartnershipLinkInput {
    status: PartnershipLinkStatus
    originalUrl: String
    partnershipId: Int
    listItemId: Int
    createdByUserId: Int
  }

  type Mutation {
    createPartnershipLink(input: CreatePartnershipLinkInput!): PartnershipLink!
      @requireAuth
    updatePartnershipLink(
      id: String!
      input: UpdatePartnershipLinkInput!
    ): PartnershipLink! @requireAuth
    deletePartnershipLink(id: String!): PartnershipLink! @requireAuth
  }
`
