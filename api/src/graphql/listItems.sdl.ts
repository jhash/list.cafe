export const schema = gql`
  type ListItem {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    description: String
    url: String!
    list: List!
    listId: Int!
    quantity: Int!
    voting: Boolean
    # reservations: [Reservation]!
    # purchases: [Purchase]!
    parent: ListItem
    parentId: Int
    children: [ListItem]!
    # images: [Image]!
    order: Int
    price: Float
  }

  type Query {
    listItems(listId: Int!): [ListItem!]! @skipAuth
    listItem(id: Int!): ListItem @skipAuth
  }

  input CreateListItemInput {
    title: String!
    description: String
    url: String!
    listId: Int!
    quantity: Int!
    voting: Boolean
    parentId: Int
    order: Int
    price: Float
  }

  input UpdateListItemInput {
    title: String
    description: String
    url: String
    listId: Int
    quantity: Int
    voting: Boolean
    parentId: Int
    order: Int
    price: Float
  }

  type Mutation {
    createListItem(input: CreateListItemInput!): ListItem! @requireAuth
    updateListItem(id: Int!, input: UpdateListItemInput!): ListItem!
      @requireAuth
    deleteListItem(id: Int!): ListItem! @requireAuth
  }
`
