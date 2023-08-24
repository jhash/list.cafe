import { useMemo } from 'react'

import intersection from 'lodash/intersection'
import { ListMembershipsQuery, ListRole } from 'types/graphql'

import { useAuth } from 'src/auth'

import DashboardListMembership from '../DashboardListMembership/DashboardListMembership'

export const listRolesIntersect = (
  roles: ListRole[] | undefined,
  authRoles: ListRole[]
) => !!roles?.length && !!intersection(roles, authRoles).length

const DashboardListMemberships = ({
  listMemberships,
}: ListMembershipsQuery) => {
  const { currentUser } = useAuth()

  const canEdit = useMemo(
    () =>
      listRolesIntersect(
        listMemberships
          .filter((membership) => membership.user?.id === currentUser.id)
          .map((membership) => membership.listRole),
        ['OWNER', 'ADMIN']
      ),
    [currentUser, listMemberships]
  )

  const canDelete = canEdit

  return (
    <ul className="flex flex-grow flex-col gap-2">
      {listMemberships.map((membership, index) => (
        <DashboardListMembership
          key={index}
          membership={membership}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      ))}
    </ul>
  )
}

export default DashboardListMemberships
