export const schema = gql`
  type PartnershipContact {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    person: Person!
    personId: Int!
    partnership: Partnership
    partnershipId: Int
    addedByUser: User
    addedByUserId: Int
  }

  type Query {
    partnershipContacts: [PartnershipContact!]! @requireAuth
    partnershipContact(id: Int!): PartnershipContact @requireAuth
  }

  input CreatePartnershipContactInput {
    personId: Int!
    partnershipId: Int
    addedByUserId: Int
  }

  input UpdatePartnershipContactInput {
    personId: Int
    partnershipId: Int
    addedByUserId: Int
  }

  type Mutation {
    createPartnershipContact(
      input: CreatePartnershipContactInput!
    ): PartnershipContact! @requireAuth
    updatePartnershipContact(
      id: Int!
      input: UpdatePartnershipContactInput!
    ): PartnershipContact! @requireAuth
    deletePartnershipContact(id: Int!): PartnershipContact! @requireAuth
  }
`
