export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String! @requireAuth
    person: Person!
    personId: Int!
    # userRoles: [UserRole]!
    # groupMemberships: [GroupMembership]!
    listMemberships: [ListMembership]!
    userInvites: [UserInvite]
    # partnershipStatusChanges: [PartnershipStatusChange]!
    # partnershipContactsAdded: [PartnershipContact]!
    # listViews: [ListView]!
    reservations: [Reservation]!
    # giftPreferencesAdded: [GiftPreferences]!
    # purchases: [Purchase]!
    # listItemTags: [ListItemTag]!
    # listTags: [ListTag]!
    # peopleCreated: [Person]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    personId: Int
    person: CreatePersonInput
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }

  input UpdateUserInput {
    email: String
    personId: Int
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
