export const schema = gql`
  type Partnership {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    notes: String
    status: PartnershipStatus!
    url: String!
    partnershipContacts: [PartnershipContact]!
    affiliateId: String
    affiliateIdParam: String
  }

  enum PartnershipStatus {
    QUEUED
    CONTACTING
    SELLING
    NEGOTIATING
    SIGNING
    SUCCESSFUL
    UNSUCCESSFUL
  }

  type Query {
    partnerships: [Partnership!]! @requireAuth
    partnership(id: Int!): Partnership @requireAuth
  }

  input CreatePartnershipInput {
    name: String!
    notes: String
    status: PartnershipStatus!
    url: String!
    affiliateId: String
    affiliateIdParam: String
  }

  input UpdatePartnershipInput {
    name: String
    notes: String
    status: PartnershipStatus
    url: String
    affiliateId: String
    affiliateIdParam: String
  }

  type Mutation {
    createPartnership(input: CreatePartnershipInput!): Partnership! @requireAuth
    updatePartnership(id: Int!, input: UpdatePartnershipInput!): Partnership!
      @requireAuth
    deletePartnership(id: Int!): Partnership! @requireAuth
  }
`
