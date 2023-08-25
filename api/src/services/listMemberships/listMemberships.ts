import type {
  QueryResolvers,
  MutationResolvers,
  ListMembershipRelationResolvers,
} from 'types/graphql'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { LIST_CAFE_URL } from 'src/lib/url'

export const listMembershipsByListId: QueryResolvers['listMembershipsByListId'] =
  ({ listId }) => {
    return db.listMembership.findMany({ where: { listId } })
  }

export const listMemberships: QueryResolvers['listMemberships'] = () => {
  // TODO: add this all over
  if (!hasRole(['ADMIN', 'SUPPORT'])) {
    throw new Error('You are not authorized to access this')
  }
  return db.listMembership.findMany()
}

export const listMembership: QueryResolvers['listMembership'] = ({ id }) => {
  return db.listMembership.findUnique({
    where: { id },
  })
}

export const createListMembership: MutationResolvers['createListMembership'] =
  async ({ input }) => {
    if (!context.currentUser?.id) {
      throw new Error('You must be logged in to create memberships')
    }
    if (!input.email && !input.userId) {
      throw new Error('Either an email or a user id is required')
    }

    if (
      context.currentUser?.email &&
      context.currentUser?.email === input.email
    ) {
      throw new Error('You cannot add yourself as a member')
    }

    const membership = await db.listMembership.create({
      data: {
        list: {
          connect: {
            id: input.listId,
          },
        },
        listRole: input.listRole,
        userInvites: {
          create: {
            user: {
              connectOrCreate: {
                where: input.userId
                  ? {
                      id: input.userId,
                    }
                  : {
                      email: input.email,
                    },
                create: {
                  userRoles: {
                    create: {},
                  },
                  email: input.email,
                  person: {
                    connectOrCreate: {
                      where: {
                        email: input.email,
                      },
                      create: {
                        email: input.email,
                        name: input.name,
                        createdByUser: {
                          connect: {
                            id: context.currentUser.id,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            name: input.name,
            email: input.email,
          },
        },
        user: {
          connectOrCreate: {
            where: input.userId
              ? {
                  id: input.userId,
                }
              : {
                  email: input.email,
                },
            create: {
              userRoles: {
                create: {},
              },
              userInvites: {
                create: {
                  name: input.name,
                  email: input.email,
                },
              },
              email: input.email,
              person: {
                connectOrCreate: {
                  where: {
                    email: input.email,
                  },
                  create: {
                    email: input.email,
                    name: input.name,
                    createdByUser: {
                      connect: {
                        id: context.currentUser.id,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      include: {
        list: true,
        user: {
          include: {
            userInvites: true,
            person: true,
          },
        },
      },
    })

    const invites = membership.user?.userInvites?.filter(
      (invite) => invite.listMembershipId === membership.id
    )

    // TODO: still send email to existing user with a pending invite
    // TODO: move to a job
    if (invites?.length && (input.email || membership.user?.email)) {
      const email =
        input.email || membership.user?.email || membership.user?.person?.email
      const name = input.name || membership.user?.person?.name

      const invite = invites.find((invite) => invite.status === 'PENDING')

      sendEmail({
        to: email,
        subject: `${
          context.currentUser.person?.name
            ? `${context.currentUser.person?.name} has invited you`
            : "You've been invited"
        } to the list ${membership.list.name} on list.cafe`,
        // TODO: tell them what role
        html: `${name ? `<p>Hi ${name}</p>` : ''}<p>${
          context.currentUser?.person?.name
            ? `${context.currentUser?.person?.name} has invited you to the list `
            : "You've been invited to the list "
        }<strong>${membership.list.name}</strong>!</p>
        <p>View the list here: <a href="${
          invite
            ? membership.user?.hashedPassword
              ? // TODO: redirect to list
                `${LIST_CAFE_URL}/dashboard/lists/${membership.listId}?userInviteId=${invite.id}`
              : `${LIST_CAFE_URL}/signup?userInviteId=${invite.id}`
            : `${LIST_CAFE_URL}/dashboard/lists/${membership.listId}`
        }">${membership.list.name}</a></p>`,
      })
    }

    return membership
  }

export const deleteListMembership: MutationResolvers['deleteListMembership'] =
  ({ id }) => {
    return db.listMembership.delete({
      where: { id },
    })
  }

export const ListMembership: ListMembershipRelationResolvers = {
  list: (_obj, { root }) => {
    return db.listMembership.findUnique({ where: { id: root?.id } }).list()
  },
  user: (_obj, { root }) => {
    return db.listMembership.findUnique({ where: { id: root?.id } }).user()
  },
}
