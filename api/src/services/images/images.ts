import type {
  QueryResolvers,
  MutationResolvers,
  ImageRelationResolvers,
  CreateImageInput,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const images: QueryResolvers['images'] = ({ listItemId }) => {
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

  const strippedInput: Omit<CreateImageInput, 'listItemId'> = {
    ...input,
  }
  return db.image.create({
    data: {
      ...strippedInput,
      listItem: {
        connect: {
          id: listItemId,
        },
      },
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
    where: { id },
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
