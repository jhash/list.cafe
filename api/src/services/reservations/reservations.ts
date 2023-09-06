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

    if (!userId && !email) {
      throw new Error(
        'You must either log in or include your email in order to create a reservation'
      )
    }

    const { comment, price, quantity, status } = input

    const reservation = await db.reservation.create({
      data: {
        comment,
        price,
        quantity,
        status,
        user: userId
          ? { connect: { id: userId } }
          : {
              create: {
                email,
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

      // TODO: include a verification link
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
  // TODO: support deleting reservations for owners, admins, etc.
  return db.reservation.update({
    data: input,
    where: { id, userId: context.currentUser?.id },
  })
}

export const deleteReservation: MutationResolvers['deleteReservation'] = ({
  id,
}) => {
  // TODO: support deleting reservations for owners, admins, etc.
  return db.reservation.delete({
    where: { id, userId: context.currentUser?.id },
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
