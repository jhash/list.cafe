import type {
  QueryResolvers,
  MutationResolvers,
  ReservationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { LIST_CAFE_URL } from 'src/lib/url'

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
    const userId = input.userId || context.currentUser?.id

    const reservation = await db.reservation.create({
      data: {
        user: {
          connectOrCreate: {
            where: userId
              ? {
                  id: userId,
                }
              : { email },
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
      include: {
        user: {
          include: {
            userInvites: true,
          },
        },
        listItem: {
          include: {
            list: {
              include: { identifier: true },
            },
          },
        },
      },
    })

    const invites = reservation.user?.userInvites?.filter(
      (invite) => invite.status === 'PENDING'
    )

    // TODO: move to a job
    if (email) {
      const name = input.user?.person?.name || context.currentUser?.name

      const invite = invites?.[0]

      sendEmail({
        to: email,
        subject: `You reserved ${reservation.listItem.title} from the list ${reservation.listItem.list.name} on list.cafe`,
        html: `${name ? `<p>Hi ${name}</p>` : ''}<p>You reserved ${
          reservation.quantity || 1
        } of the item ${reservation.listItem.title} from the list <strong>${
          reservation.listItem.list.name
        }</strong>!</p>
        <p>View the list here: <a href="${`${LIST_CAFE_URL}/${
          reservation.listItem.list.identifier.id
        }${invite ? `?userInviteId=${invite.id}` : ''}`}">${
          reservation.listItem.list.name
        }</a></p>${
          !reservation.user?.hashedPassword
            ? `<p><a href="${LIST_CAFE_URL}/signup${
                invite ? `?userInviteId=${invite.id}` : ''
              }">Finish signing up here</a></p>`
            : ''
        }`,
      })
    }

    return { ...reservation, listItem: undefined }
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