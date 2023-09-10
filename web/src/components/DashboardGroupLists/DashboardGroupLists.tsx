import { useMemo } from 'react'

import { Link, routes } from '@redwoodjs/router'

import { AddItemButton } from '../AddItemButton/AddItemButton'
import { groupRolesIntersect } from '../DashboardGroup/DashboardGroup'
import { DashboardGroupChild } from '../DashboardGroupSettings/DashboardGroupSettings'
import ListsCell from '../ListsCell'
import SectionTitle from '../SectionTitle/SectionTitle'

const DashboardGroupLists: DashboardGroupChild = ({
  group: { id, groupRoles },
  loading,
}) => {
  const canAdd = useMemo(
    () => !id || groupRolesIntersect(groupRoles, ['EDIT', 'OWNER', 'ADMIN']),
    [groupRoles, id]
  )

  return (
    <div className="flex w-full max-w-full flex-col gap-3">
      <div className="flex w-full max-w-full items-center gap-3">
        <SectionTitle>Lists</SectionTitle>
        {/* TODO: support without having saved? */}
        {canAdd && (
          <div className="flex items-center gap-3">
            <Link to={routes.groupNewList({ groupId: id })}>
              <AddItemButton disabled={loading} />
            </Link>
          </div>
        )}
      </div>
      <ul className="flex w-full max-w-full flex-col gap-2">
        <ListsCell groupId={id} />
      </ul>
    </div>
  )
}

export default DashboardGroupLists
