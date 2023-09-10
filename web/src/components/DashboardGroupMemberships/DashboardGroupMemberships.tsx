import { useMemo } from 'react'

import { GroupMembershipsQuery } from 'types/graphql'

import { useAuth } from 'src/auth'

import { groupRolesIntersect } from '../DashboardGroup/DashboardGroup'
import DashboardGroupMembership from '../DashboardGroupMembership/DashboardGroupMembership'

const DashboardGroupMemberships = ({
  groupMemberships,
}: GroupMembershipsQuery) => {
  const { currentUser } = useAuth()

  const canEdit = useMemo(
    () =>
      groupRolesIntersect(
        groupMemberships
          .filter((membership) => membership.user?.id === currentUser?.id)
          .map((membership) => membership.groupRole),
        ['OWNER', 'ADMIN']
      ),
    [currentUser, groupMemberships]
  )

  const canDelete = canEdit

  return (
    <ul className="flex flex-grow flex-col gap-2">
      {groupMemberships.map((membership, index) => (
        <DashboardGroupMembership
          key={membership.id || index}
          membership={membership}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      ))}
    </ul>
  )
}

export default DashboardGroupMemberships
