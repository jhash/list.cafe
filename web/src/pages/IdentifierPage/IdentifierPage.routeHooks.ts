import { db } from '$api/src/lib/db'

export async function routeParameters() {
  return (
    await db.identifier.findMany({
      where: {
        OR: [
          {
            list: {
              OR: [{ visibility: 'PUBLIC' }, { visibility: 'LINK' }],
            },
          },
          {
            person: {
              OR: [
                {
                  visibility: 'PUBLIC',
                },
                // TODO: add group check
              ],
            },
          },
          {
            group: {
              OR: [{ visibility: 'PUBLIC' }, { visibility: 'LINK' }],
            },
          },
        ],
      },
    })
  )
    .filter((identifier) => {
      return (
        !!identifier.listId || !!identifier.groupId || !!identifier.personId
      )
    })
    .map(({ id }) => ({
      identifier: id,
    }))
}
