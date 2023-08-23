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
    groupMemberships: [GroupMembership!]! @requireAuth
    groupMembership(id: Int!): GroupMembership @requireAuth
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
      @requireAuth
    updateGroupMembership(
      id: Int!
      input: UpdateGroupMembershipInput!
    ): GroupMembership! @requireAuth
    deleteGroupMembership(id: Int!): GroupMembership! @requireAuth
  }
`
