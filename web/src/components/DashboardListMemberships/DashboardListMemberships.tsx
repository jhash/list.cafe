import { useMemo } from 'react'

import { ListMembershipsQuery } from 'types/graphql'

import { useAuth } from 'src/auth'
import { listRolesIntersect } from 'src/layouts/DashboardListLayout/DashboardListLayout'

import DashboardListMembership from '../DashboardListMembership/DashboardListMembership'

const DashboardListMemberships = ({
  listMemberships,
}: ListMembershipsQuery) => {
  const { currentUser } = useAuth()

  const canEdit = useMemo(
    () =>
      listRolesIntersect(
        listMemberships
          .filter((membership) => membership.user?.id === currentUser?.id)
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
