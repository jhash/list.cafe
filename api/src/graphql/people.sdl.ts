export const schema = gql`
  type Person {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    email: String @requireAuth
    user: User
    addresses: [Address]!
    # defaultAddressId: Int
    # partnershipContact: PartnershipContact
    # giftPreferences: [GiftPreferences]!
    images: [Image]!
    createdByUser: User
    createdByUserId: Int
    identifier: Identifier
    visibility: PersonVisibility
  }

  enum PersonVisibility {
    PRIVATE
    GROUP
    PUBLIC
  }

  type Query {
    people: [Person!]! @skipAuth
    person(id: Int!): Person @skipAuth
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
    createPerson(input: CreatePersonInput!): Person!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    updatePerson(id: Int!, input: UpdatePersonInput!): Person!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    deletePerson(id: Int!): Person! @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }
`
