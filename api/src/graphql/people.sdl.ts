export const schema = gql`
  type Person {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    email: String
    user: User
    # addresses: [Address]!
    # defaultAddressId: Int
    # partnershipContact: PartnershipContact
    # giftPreferences: [GiftPreferences]!
    # images: [Image]!
    # createdByUser: User
    # createdByUserId: Int
    identifier: Identifier
  }

  type Query {
    people: [Person!]! @requireAuth
    person(id: Int!): Person @requireAuth
  }

  input CreatePersonInput {
    name: String!
    email: String
    defaultAddressId: Int
    createdByUserId: Int
  }

  input UpdatePersonInput {
    name: String
    email: String
    defaultAddressId: Int
    createdByUserId: Int
  }

  type Mutation {
    createPerson(input: CreatePersonInput!): Person! @requireAuth
    updatePerson(id: Int!, input: UpdatePersonInput!): Person! @requireAuth
    deletePerson(id: Int!): Person! @requireAuth
  }
`
