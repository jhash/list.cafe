export const schema = gql`
  type GroupMembership {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: Int!
    user: User!
    groupRole: GroupRole!
    group: Group!
    groupId: Int!
  }

  enum GroupRole {
    VIEW
    EDIT
    ADMIN
    OWNER
  }

  type Query {
    adminGroupMemberships: [GroupMembership!]!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    groupMemberships(groupId: Int!): [GroupMembership!]! @requireAuth
    groupMembership(id: Int!): GroupMembership
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }

  input CreateGroupMembershipInput {
    userId: Int
    groupRole: GroupRole!
    groupId: Int!
    email: String
    name: String
  }

  input UpdateGroupMembershipInput {
    groupRole: GroupRole
  }

  type Mutation {
    createGroupMembership(input: CreateGroupMembershipInput!): GroupMembership!
      @requireAuth
    updateGroupMembership(
      id: Int!
      input: UpdateGroupMembershipInput!
    ): GroupMembership! @requireAuth
    deleteGroupMembership(id: Int!): GroupMembership! @requireAuth
  }
`
