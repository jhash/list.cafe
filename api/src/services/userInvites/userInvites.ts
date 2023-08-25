import type {
  QueryResolvers,
  MutationResolvers,
  UserInviteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userInvites: QueryResolvers['userInvites'] = () => {
  return db.userInvite.findMany()
}

export const userInvite: QueryResolvers['userInvite'] = ({ id }) => {
  return db.userInvite.findUnique({
    where: { id },
  })
}

export const createUserInvite: MutationResolvers['createUserInvite'] = ({
  input,
}) => {
  return db.userInvite.create({
    data: input,
  })
}

export const updateUserInvite: MutationResolvers['updateUserInvite'] = ({
  id,
  input,
}) => {
  return db.userInvite.update({
    data: input,
    where: { id },
  })
}

export const deleteUserInvite: MutationResolvers['deleteUserInvite'] = ({
  id,
}) => {
  return db.userInvite.delete({
    where: { id },
  })
}

export const UserInvite: UserInviteRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userInvite.findUnique({ where: { id: root?.id } }).user()
  },
}
