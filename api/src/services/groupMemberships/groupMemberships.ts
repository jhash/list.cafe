import type {
  QueryResolvers,
  MutationResolvers,
  GroupMembershipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { LIST_CAFE_URL } from 'src/lib/url'

import {
  groupMembershipsWhereClauses,
  validateUserCanEditGroup,
} from '../groups/groups'

export const groupMemberships: QueryResolvers['groupMemberships'] = ({
  groupId,
}) => {
  return db.groupMembership.findMany({
    where: {
      groupId,
      group: {
        // TODO: remove edit?
        OR: [...groupMembershipsWhereClauses(['ADMIN', 'OWNER', 'EDIT'])],
      },
    },
  })
}

export const groupMembership: QueryResolvers['groupMembership'] = ({ id }) => {
  return db.groupMembership.findUnique({
    where: { id },
  })
}

export const createGroupMembership: MutationResolvers['createGroupMembership'] =
  async ({ input }) => {
    // TODO: don't allow creating roles above current user's

    if (!input.email && !input.userId) {
      throw new Error('Either an email or a user id is required')
    }

    if (
      context.currentUser?.email &&
      context.currentUser?.email === input.email
    ) {
      throw new Error('You cannot add yourself as a member')
    }

    if (!input.groupId) {
      throw new Error('groupId is required to create a group membership')
    }

    // TODO: move to directive?
    // Should throw if user doesn't have contribute access
    await validateUserCanEditGroup({ id: input.groupId })

    const membership = await db.groupMembership.create({
      data: {
        group: {
          connect: {
            id: input.groupId,
          },
        },
        groupRole: input.groupRole,
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
                            id: context.currentUser?.id,
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
                        id: context.currentUser?.id,
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
        group: true,
        user: {
          include: {
            userInvites: true,
            person: true,
          },
        },
      },
    })

    try {
      const invites = membership.user?.userInvites?.filter(
        (invite) => invite.listMembershipId === membership.id
      )

      // TODO: still send email to existing user with a pending invite
      // TODO: move to a job
      if (invites?.length && (input.email || membership.user?.email)) {
        const email =
          input.email ||
          membership.user?.email ||
          membership.user?.person?.email
        const name = input.name || membership.user?.person?.name

        const invite = invites.find((invite) => invite.status === 'PENDING')

        // TODO: include a verification link
        sendEmail({
          to: email,
          subject: `${
            context.currentUser.person?.name
              ? `${context.currentUser.person?.name} has invited you`
              : "You've been invited"
          } to the group ${membership.group.name} on list.cafe`,
          // TODO: tell them what role
          html: `${name ? `<p>Hi ${name}</p>` : ''}<p>${
            context.currentUser?.person?.name
              ? `${context.currentUser?.person?.name} has invited you to the group `
              : "You've been invited to the group "
          }<strong>${membership.group.name}</strong>!</p>
        <p>View the group here: <a href="${
          invite
            ? membership.user?.hashedPassword
              ? // TODO: redirect to group
                `${LIST_CAFE_URL}/dashboard/groups/${membership.groupId}?userInviteId=${invite.id}`
              : `${LIST_CAFE_URL}/signup?userInviteId=${invite.id}`
            : `${LIST_CAFE_URL}/dashboard/groups/${membership.groupId}`
        }">${membership.group.name}</a></p>`,
        })
      }
    } catch (error) {
      console.error('Failed to send invite email')
    }

    return membership
  }

export const updateGroupMembership: MutationResolvers['updateGroupMembership'] =
  ({ id, input }) => {
    return db.groupMembership.update({
      data: input,
      where: { id },
    })
  }

export const deleteGroupMembership: MutationResolvers['deleteGroupMembership'] =
  ({ id }) => {
    return db.groupMembership.delete({
      where: { id },
    })
  }

export const GroupMembership: GroupMembershipRelationResolvers = {
  user: (_obj, { root }) => {
    return db.groupMembership.findUnique({ where: { id: root?.id } }).user()
  },
  group: (_obj, { root }) => {
    return db.groupMembership.findUnique({ where: { id: root?.id } }).group()
  },
}
