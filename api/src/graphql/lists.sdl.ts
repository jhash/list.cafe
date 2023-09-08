export const schema = gql`
  type List {
    id: Int!
    createdAt: DateTime
    updatedAt: DateTime
    name: String!
    description: String
    type: ListType!
    identifier: Identifier
    visibility: ListVisibility
    listItems: [ListItem]
    listMemberships: [ListMembership]
    listGroupMemberships: [ListGroupMembership]
    listRoles: [ListRole]
    owners: [Person]
  }

  enum ListVisibility {
    PRIVATE
    GROUP
    LINK
    PUBLIC
  }

  enum ListType {
    GIFTS
    WISHLIST
    WEDDING
    BABY_SHOWER
    TOP
    BOOKMARKS
    SOCIAL
    FAVORITES
    AWESOME
    INVENTORY
    TODO
    # FORUM
    # TABLE
    LINKTREE
    JOBS
    SCHOOL
    SHOPPING
    GROCERIES
    IDEAS
    INFO
  }

  type Query {
    publicLists(take: Int, skip: Int, personId: Int): [List!]! @skipAuth
    adminLists: [List!]! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    lists: [List!]! @requireAuth
    list(id: Int!): List @skipAuth
  }

  input CreateListInput {
    name: String!
    description: String
    type: ListType!
    identifier: CreateIdentifierInput
    visibility: ListVisibility
    listItems: [CreateListItemInput]
  }

  input UpdateListInput {
    name: String
    description: String
    type: ListType
    identifier: CreateIdentifierInput
    visibility: ListVisibility
  }

  type Mutation {
    createList(input: CreateListInput!): List! @requireAuth
    updateList(id: Int!, input: UpdateListInput!): List! @requireAuth
    deleteList(id: Int!): List! @requireAuth
  }
`
