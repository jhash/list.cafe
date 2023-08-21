export const schema = gql`
  type Group {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    # listGroupMemberships: [ListGroupMembership]!
    # groupMemberships: [GroupMembership]!
    type: GroupType!
    visibility: GroupVisibility!
    identifier: Identifier
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
    INVITE
    LINK
    PUBLIC
  }

  type Query {
    groups: [Group!]! @requireAuth
    group(id: Int!): Group @requireAuth
  }

  input CreateGroupInput {
    name: String!
    type: GroupType!
    visibility: GroupVisibility!
  }

  input UpdateGroupInput {
    name: String
    type: GroupType
    visibility: GroupVisibility
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group! @requireAuth
    updateGroup(id: Int!, input: UpdateGroupInput!): Group! @requireAuth
    deleteGroup(id: Int!): Group! @requireAuth
  }
`
