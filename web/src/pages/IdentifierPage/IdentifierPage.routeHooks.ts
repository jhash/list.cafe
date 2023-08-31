import { db } from '$api/src/lib/db'

export async function routeParameters() {
  return (await db.identifier.findMany())
    .filter((identifier) => {
      return (
        !!identifier.listId || !!identifier.groupId || !!identifier.personId
      )
    })
    .map(({ id }) => ({
      identifier: id,
    }))
}
