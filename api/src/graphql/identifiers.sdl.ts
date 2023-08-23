export const schema = gql`
  type Identifier {
    id: String!
    person: Person
    personId: Int
    list: List
    listId: Int
    group: Group
    groupId: Int
  }

  type Query {
    identifiers: [Identifier!]! @requireAuth
    identifier(id: String!): Identifier @requireAuth
  }

  input CreateIdentifierInput {
    id: String
    personId: Int
    listId: Int
    groupId: Int
  }

  input UpdateIdentifierInput {
    personId: Int
    listId: Int
    groupId: Int
  }

  type Mutation {
    createIdentifier(input: CreateIdentifierInput!): Identifier! @requireAuth
    updateIdentifier(id: String!, input: UpdateIdentifierInput!): Identifier!
      @requireAuth
    deleteIdentifier(id: String!): Identifier! @requireAuth
  }
`
