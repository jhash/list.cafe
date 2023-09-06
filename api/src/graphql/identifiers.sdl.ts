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
    identifiers: [Identifier!]! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    identifier(id: String!): Identifier @skipAuth
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
    createIdentifier(input: CreateIdentifierInput!): Identifier!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    updateIdentifier(id: String!, input: UpdateIdentifierInput!): Identifier!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    deleteIdentifier(id: String!): Identifier!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }
`
