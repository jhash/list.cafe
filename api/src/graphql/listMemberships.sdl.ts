export const schema = gql`
  type ListMembership {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    listRole: ListRole!
    list: List!
    listId: Int!
    user: User!
    userId: Int!
  }

  enum ListRole {
    VIEW
    CONTRIBUTE
    EDIT
    ADMIN
    OWNER
  }

  type Query {
    listMemberships: [ListMembership!]!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    listMembershipsByListId(listId: Int!): [ListMembership!]! @requireAuth
    listMembership(id: Int!): ListMembership
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }

  input CreateListMembershipInput {
    listRole: ListRole!
    listId: Int!
    userId: Int
    name: String
    email: String
  }

  input UpdateListMembershipInput {
    listRole: ListRole
  }

  type Mutation {
    createListMembership(input: CreateListMembershipInput!): ListMembership!
      @requireAuth
    updateListMembership(
      id: Int!
      input: UpdateListMembershipInput!
    ): ListMembership! @requireAuth
    deleteListMembership(id: Int!): ListMembership! @requireAuth
  }
`
