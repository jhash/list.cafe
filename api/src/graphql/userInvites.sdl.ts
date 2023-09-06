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
    userInvites: [UserInvite!]! @requireAuth(roles: ["ADMIN", "SUPPORT"])
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
    createUserInvite(input: CreateUserInviteInput!): UserInvite!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    updateUserInvite(id: String!, input: UpdateUserInviteInput!): UserInvite!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    deleteUserInvite(id: String!): UserInvite!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }
`
