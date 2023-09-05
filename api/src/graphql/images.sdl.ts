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
    images(listItemId: Int!): [Image!]! @skipAuth
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
  }

  input CreateImageInput {
    url: String!
    height: Float
    width: Float
    format: String
    alt: String
    listItemId: Int
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
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
    uploadImages(images: [Upload!]!): SuccessResult @requireAuth
  }

  scalar Upload

  type SuccessResult {
    success: Boolean!
    url: String!
    message: String
  }
`
