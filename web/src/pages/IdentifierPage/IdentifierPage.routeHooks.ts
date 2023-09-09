import { groupMembershipsWhereClauses } from '../../../../api/src/services/groups/groups'
import { listMembershipsWhereClauses } from '../../../../api/src/services/lists/lists'

import { db } from '$api/src/lib/db'

export async function routeParameters() {
  return (
    await db.identifier.findMany({
      where: {
        OR: [
          {
            list: {
              OR: [
                { visibility: 'PUBLIC' },
                { visibility: 'LINK' },
                ...listMembershipsWhereClauses(),
              ],
            },
          },
          {
            person: {
              OR: [
                {
                  user: {
                    id: context.currentUser?.id,
                  },
                },
                {
                  visibility: 'PUBLIC',
                },
                // TODO: add group check
              ],
            },
          },
          {
            group: {
              OR: [
                { visibility: 'PUBLIC' },
                { visibility: 'LINK' },
                ...groupMembershipsWhereClauses(),
              ],
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
