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
    groupMemberships: [GroupMembership!]!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    groupMembership(id: Int!): GroupMembership
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }

  input CreateGroupMembershipInput {
    userId: Int!
    groupRole: GroupRole!
    groupId: Int!
  }

  input UpdateGroupMembershipInput {
    userId: Int
    groupRole: GroupRole
    groupId: Int
  }

  type Mutation {
    createGroupMembership(input: CreateGroupMembershipInput!): GroupMembership!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    updateGroupMembership(
      id: Int!
      input: UpdateGroupMembershipInput!
    ): GroupMembership! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    deleteGroupMembership(id: Int!): GroupMembership!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }
`
