export const schema = gql`
  type Group {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String
    # listGroupMemberships: [ListGroupMembership]!
    # groupMemberships: [GroupMembership]!
    type: GroupType!
    visibility: GroupVisibility!
    identifier: Identifier
    groupRoles: [GroupRole]
  }

  enum GroupType {
    GENERIC
    FRIENDS
    FAMILY
    COMPANY
    NON_PROFIT
  }

  enum GroupVisibility {
    PRIVATE
    LINK
    PUBLIC
  }

  type Query {
    groups: [Group!]! @skipAuth
    group(id: Int!): Group @skipAuth
  }

  input CreateGroupInput {
    name: String!
    description: String
    type: GroupType!
    visibility: GroupVisibility!
    identifier: CreateIdentifierInput
  }

  input UpdateGroupInput {
    name: String
    description: String
    type: GroupType
    visibility: GroupVisibility
    identifier: CreateIdentifierInput
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group! @requireAuth
    updateGroup(id: Int!, input: UpdateGroupInput!): Group! @requireAuth
    deleteGroup(id: Int!): Group! @requireAuth
  }
`
