import type {
  QueryResolvers,
  MutationResolvers,
  ImageRelationResolvers,
  CreateImageInput,
} from 'types/graphql'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { listMembershipsWhereClauses } from '../lists/lists'

export const adminImages: QueryResolvers['adminImages'] = () => {
  return db.image.findMany()
}

export const personImages: QueryResolvers['personImages'] = ({ personId }) => {
  // TODO: any auth needed here?
  return db.image.findMany({ where: { personId } })
}

export const listItemImages: QueryResolvers['listItemImages'] = ({
  listItemId,
}) => {
  // TODO: any auth needed here?
  return db.image.findMany({ where: { listItemId } })
}

export const image: QueryResolvers['image'] = ({ id }) => {
  return db.image.findUnique({
    where: { id },
  })
}

export const createImage: MutationResolvers['createImage'] = ({ input }) => {
  const listItemId = input.listItemId

  delete input.listItemId

  const personId = input.personId

  delete input.personId

  // TODO: write test
  if (!personId && !listItemId && !hasRole(['ADMIN', 'SUPPORT'])) {
    throw new Error('Either personId or listItemId is required to create image')
  }

  const strippedInput: Omit<CreateImageInput, 'listItemId' | 'personId'> = {
    ...input,
  }
  return db.image.create({
    data: {
      ...strippedInput,
      listItem: listItemId
        ? {
            connect: {
              id: listItemId,
            },
          }
        : undefined,
      person: personId
        ? {
            connect: {
              id: personId,
            },
          }
        : undefined,
    },
  })
}

export const updateImage: MutationResolvers['updateImage'] = ({
  id,
  input,
}) => {
  return db.image.update({
    data: input,
    where: { id },
  })
}

export const deleteImage: MutationResolvers['deleteImage'] = ({ id }) => {
  // TODO: delete from google?
  return db.image.delete({
    where: {
      id,
      ...(hasRole(['ADMIN', 'SUPPORT'])
        ? {}
        : {
            OR: [
              {
                person: {
                  id: context.currentUser?.person?.id,
                },
              },
              {
                listItem: {
                  list: {
                    OR: [
                      ...listMembershipsWhereClauses(
                        ['ADMIN', 'CONTRIBUTE', 'OWNER', 'EDIT'],
                        ['OWNER', 'ADMIN', 'EDIT']
                      ),
                    ],
                  },
                },
              },
            ],
          }),
    },
  })
}

export const Image: ImageRelationResolvers = {
  listItem: (_obj, { root }) => {
    return db.image.findUnique({ where: { id: root?.id } }).listItem()
  },
  person: (_obj, { root }) => {
    return db.image.findUnique({ where: { id: root?.id } }).person()
  },
}
