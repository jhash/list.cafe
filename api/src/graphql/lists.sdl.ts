export const schema = gql`
  type List {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String
    type: ListType!
    identifier: Identifier
    listItems: [ListItem]
  }

  enum ListType {
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
    FORUM
    TABLE
    LINKTREE
    JOBS
  }

  type Query {
    lists: [List!]! @skipAuth
    list(id: Int!): List @skipAuth
  }

  input CreateListInput {
    name: String!
    description: String
    type: ListType!
    identifier: CreateIdentifierInput
  }

  input UpdateListInput {
    name: String
    description: String
    type: ListType
  }

  type Mutation {
    createList(input: CreateListInput!): List! @requireAuth
    updateList(id: Int!, input: UpdateListInput!): List! @requireAuth
    deleteList(id: Int!): List! @requireAuth
  }
`
