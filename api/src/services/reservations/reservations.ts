import type {
  QueryResolvers,
  MutationResolvers,
  ReservationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const reservations: QueryResolvers['reservations'] = () => {
  return db.reservation.findMany()
}

export const reservation: QueryResolvers['reservation'] = ({ id }) => {
  return db.reservation.findUnique({
    where: { id },
  })
}

export const createReservation: MutationResolvers['createReservation'] =
  async ({ input }) => {
    const email = input.user?.email || input.user?.person?.email

    const reservation = await db.reservation.create({
      data: {
        user: {
          connectOrCreate: {
            where: {
              id: input.userId || context.currentUser?.id,
            },
            create: {
              email: email,
              person: {
                connectOrCreate: {
                  where: {
                    email,
                  },
                  create: input.user?.person,
                },
              },
              userInvites: {
                create: {
                  name: input.user?.person?.name,
                  email: email,
                },
              },
            },
          },
        },
        listItem: {
          connect: {
            id: input.listItemId,
          },
        },
      },
    })

    return reservation
  }

export const updateReservation: MutationResolvers['updateReservation'] = ({
  id,
  input,
}) => {
  return db.reservation.update({
    data: input,
    where: { id },
  })
}

export const deleteReservation: MutationResolvers['deleteReservation'] = ({
  id,
}) => {
  return db.reservation.delete({
    where: { id },
  })
}

export const Reservation: ReservationRelationResolvers = {
  listItem: (_obj, { root }) => {
    return db.reservation.findUnique({ where: { id: root?.id } }).listItem()
  },
  user: (_obj, { root }) => {
    return db.reservation.findUnique({ where: { id: root?.id } }).user()
  },
}
