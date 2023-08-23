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
    listGroupMemberships: [ListGroupMembership!]! @requireAuth
    listGroupMembership(id: Int!): ListGroupMembership @requireAuth
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
    ): ListGroupMembership! @requireAuth
    updateListGroupMembership(
      id: Int!
      input: UpdateListGroupMembershipInput!
    ): ListGroupMembership! @requireAuth
    deleteListGroupMembership(id: Int!): ListGroupMembership! @requireAuth
  }
`
