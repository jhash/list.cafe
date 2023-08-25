export const schema = gql`
  type UserInvite {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    expiresAt: DateTime!
    user: User!
    userId: Int!
    status: InviteStatus!
    name: String
    email: String
    listMembership: ListMembership
    groupMembership: GroupMembership
  }

  enum InviteStatus {
    PENDING
    SENT
    OPENED
    CLICKED
    EXPIRED
    COMPLETE
    ACCEPTED
    DECLINED
  }

  type Query {
    userInvites: [UserInvite!]! @requireAuth
    userInvite(id: String!): UserInvite @skipAuth
  }

  input CreateUserInviteInput {
    expiresAt: DateTime!
    userId: Int!
    status: InviteStatus!
    name: String
    email: String
    listMembershipId: String
    groupMembershipId: String
  }

  input UpdateUserInviteInput {
    status: InviteStatus
  }

  type Mutation {
    createUserInvite(input: CreateUserInviteInput!): UserInvite! @requireAuth
    updateUserInvite(id: String!, input: UpdateUserInviteInput!): UserInvite!
      @skipAuth
    deleteUserInvite(id: String!): UserInvite! @requireAuth
  }
`
