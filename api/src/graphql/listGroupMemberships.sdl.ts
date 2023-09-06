export const schema = gql`
  type ListGroupMembership {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    listRole: ListRole!
    list: List!
    listId: Int!
    group: Group!
    groupId: Int!
  }

  enum ListRole {
    VIEW
    CONTRIBUTE
    EDIT
    ADMIN
    OWNER
  }

  type Query {
    listGroupMemberships: [ListGroupMembership!]!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    listGroupMembership(id: Int!): ListGroupMembership
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }

  input CreateListGroupMembershipInput {
    listRole: ListRole!
    listId: Int!
    groupId: Int!
  }

  input UpdateListGroupMembershipInput {
    listRole: ListRole
    listId: Int
    groupId: Int
  }

  type Mutation {
    createListGroupMembership(
      input: CreateListGroupMembershipInput!
    ): ListGroupMembership! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    updateListGroupMembership(
      id: Int!
      input: UpdateListGroupMembershipInput!
    ): ListGroupMembership! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    deleteListGroupMembership(id: Int!): ListGroupMembership!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }
`
