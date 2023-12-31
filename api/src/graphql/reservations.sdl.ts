export const schema = gql`
  type Reservation {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    listItem: ListItem!
    listItemId: Int!
    quantity: Int!
    user: User!
    userId: Int!
    comment: String
    price: Float
    status: ReservationStatus!
  }

  enum ReservationStatus {
    RESERVED
    RELEASED
    FULFILLED
  }

  type Query {
    reservations: [Reservation!]! @requireAuth(roles: ["ADMIN", "SUPPORT"])
    reservation(id: Int!): Reservation @requireAuth(roles: ["ADMIN", "SUPPORT"])
  }

  input CreateReservationInput {
    listItemId: Int!
    quantity: Int!
    comment: String
    price: Float
    status: ReservationStatus!
    userId: Int
    user: CreateUserInput
  }

  input UpdateReservationInput {
    quantity: Int
    comment: String
    price: Float
    status: ReservationStatus
  }

  type Mutation {
    createReservation(input: CreateReservationInput!): Reservation! @skipAuth
    updateReservation(id: Int!, input: UpdateReservationInput!): Reservation!
      @requireAuth
    deleteReservation(id: Int!): Reservation! @requireAuth
  }
`
