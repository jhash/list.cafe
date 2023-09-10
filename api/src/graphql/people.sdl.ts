export const schema = gql`
  type Person {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    email: String @requireAuth
    description: String
    pronouns: String
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
    people(groupId: Int): [Person!]! @skipAuth
    person(id: Int!): Person @skipAuth
  }

  input CreatePersonInput {
    name: String!
    email: String
    description: String
    pronouns: String
    defaultAddressId: Int
    createdByUserId: Int
    images: [CreateImageInput]
    identifier: CreateIdentifierInput
    visibility: PersonVisibility
  }

  input UpdatePersonInput {
    name: String
    email: String
    description: String
    pronouns: String
    defaultAddressId: Int
    images: [CreateImageInput]
    identifier: CreateIdentifierInput
    visibility: PersonVisibility
  }

  type Mutation {
    createPerson(input: CreatePersonInput!): Person!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    updatePerson(id: Int!, input: UpdatePersonInput!): Person!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    deletePerson(id: Int!): Person! @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }
`
