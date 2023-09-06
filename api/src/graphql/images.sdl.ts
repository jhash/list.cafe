export const schema = gql`
  type Image {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    url: String!
    alt: String
    height: Float
    width: Float
    format: String
    listItem: ListItem
    person: Person
  }

  type Query {
    images(personId: Int!): [Image!]! @skipAuth
    images(listItemId: Int!): [Image!]! @skipAuth
    images: [Image!]! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    image(id: Int!): Image @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }

  input CreateImageInput {
    url: String!
    height: Float
    width: Float
    format: String
    alt: String
    listItemId: Int
    personId: Int
  }

  input UpdateImageInput {
    url: String
    height: Float
    width: Float
    format: String
    alt: String
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image!
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
    deleteImage(id: Int!): Image! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    uploadImages(images: [Upload!]!): SuccessResult
      @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }

  scalar Upload

  type SuccessResult {
    success: Boolean!
    url: String!
    message: String
  }
`
